import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { createEdgeRouter } from "next-connect";
import AnilistClient, { ViewerQuery } from "@/services/anilist";
import dayjs from "dayjs";
import getSession from "@/utils/get-session";
import { cloneDeep } from "lodash";
import { IronSession } from "iron-session";
import { TSessionPayload, TUserSession } from "@/types/session";
import MyAnimeListClient, {
  authorizeMAL,
  getMALUserDetails,
} from "@/services/myanimelist";
import User, { TUserSchema } from "@/models/User";
import SimklClient, {
  authorizeSimkl,
  getSimklUserDetails,
} from "@/services/simkl";

const router = createEdgeRouter<NextRequest, NextFetchEvent>();
router
  .get(async () => {
    const { session, user } = await getSession();

    return NextResponse.json({ ...session, ...user });
  })
  .post(async req => {
    const body: TSessionPayload = await req.json();
    const { session, user: oldUser } = await getSession();
    let user;

    switch (body.type) {
      case "AL":
        user = await saveALSession(session, body);
        break;
      case "MAL":
        user = await saveMALSession(session, oldUser, body);
        break;
      case "SIMKL":
        user = await saveSimklSession(session, oldUser, body);
        break;
      default:
        break;
    }

    return NextResponse.json({ ...session, ...user });
  })
  .delete(async () => {
    const { session } = await getSession();
    session.destroy();
    return NextResponse.json({});
  });

export async function GET(req: NextRequest, res: NextFetchEvent) {
  return router.run(req, res) as Promise<NextResponse>;
}
export async function POST(req: NextRequest, res: NextFetchEvent) {
  return router.run(req, res) as Promise<NextResponse>;
}
export async function DELETE(req: NextRequest, res: NextFetchEvent) {
  return router.run(req, res) as Promise<NextResponse>;
}

const saveALSession = async (
  session: IronSession<TUserSession>,
  body: TSessionPayload,
): Promise<TUserSchema | undefined> => {
  if (!body.access_token) return;

  const ALUser = await AnilistClient(body.access_token)
    .query(ViewerQuery, {})
    .toPromise();
  if (!ALUser.data?.Viewer?.id) return;

  const user = (await User.findByIdAndUpdate(
    ALUser.data.Viewer.id,
    {
      anilist: {
        account_details: cloneDeep(ALUser.data.Viewer),
        auth_details: {
          access_token: body.access_token,
          expires_in: dayjs().add(365, "days").toISOString(),
        },
      },
    },
    { upsert: true, new: true },
  )
    .lean()
    .exec()) as TUserSchema;

  session.al = {
    id: user?.anilist?.account_details?.id,
    username: user?.anilist?.account_details?.name,
    avatar: user?.anilist?.account_details?.avatar?.medium,
  };
  session._id = user._id;
  await session.save();

  return user;
};
const saveMALSession = async (
  session: IronSession<TUserSession>,
  oldUser: TUserSchema,
  body: TSessionPayload,
): Promise<TUserSchema> => {
  let user;

  if (session.mal) {
    session.mal.cv = body.code_verifier ?? session.mal.cv;
    session.mal.aut = body.authorization_token ?? session.mal.aut;
  } else {
    session.mal = {
      cv: body.code_verifier,
      aut: body.authorization_token,
    };
  }
  // IF NOT YET AUTHORIZED
  if (session.mal?.aut && session.mal?.cv && !session.mal?.id) {
    const auth = await authorizeMAL(session.mal.aut, session.mal.cv);
    const client = MyAnimeListClient(`Bearer ${auth.access_token}`);
    const userDetails = await getMALUserDetails(client);

    if (userDetails) {
      user = (await User.findByIdAndUpdate(
        session._id,
        {
          myanimelist: {
            account_details: cloneDeep(userDetails),
            auth_details: {
              access_token: auth.access_token,
              refresh_token: auth.refresh_token,
              expires_in: dayjs().add(auth.expires_in, "seconds").toISOString(),
            },
          },
        },
        { upsert: true, new: true },
      )
        .lean()
        .exec()) as TUserSchema;
    }

    session.mal = {
      id: user?.myanimelist?.account_details?.id,
      username: user?.myanimelist?.account_details?.name,
      avatar: user?.myanimelist?.account_details?.picture,
    };
  }

  await session.save();
  return user ?? oldUser;
};
const saveSimklSession = async (
  session: IronSession<TUserSession>,
  oldUser: TUserSchema,
  body: TSessionPayload,
): Promise<TUserSchema> => {
  let user;

  if (session.simkl) {
    session.simkl.aut = body.authorization_token ?? session.simkl.aut;
  } else {
    session.simkl = {
      aut: body.authorization_token,
    };
  }
  // IF NOT YET AUTHORIZED
  if (session.simkl?.aut && !session.simkl?.id) {
    const auth = await authorizeSimkl(session.simkl.aut);
    const client = SimklClient(`Bearer ${auth.access_token}`);
    const userDetails = await getSimklUserDetails(client);

    if (userDetails) {
      user = (await User.findByIdAndUpdate(
        session._id,
        {
          simkl: {
            account_details: {
              ...userDetails.account,
              ...userDetails.user,
            },
            auth_details: {
              access_token: auth.access_token,
            },
          },
        },
        { upsert: true, new: true },
      )
        .lean()
        .exec()) as TUserSchema;
    }
  }

  session.simkl = {
    id: user?.simkl?.account_details?.id,
    username: user?.simkl?.account_details?.name,
    avatar: user?.simkl?.account_details?.avatar,
  };
  await session.save();
  return user ?? oldUser;
};
