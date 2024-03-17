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
  return router.run(req, res);
}
export async function POST(req: NextRequest, res: NextFetchEvent) {
  return router.run(req, res);
}
export async function DELETE(req: NextRequest, res: NextFetchEvent) {
  return router.run(req, res);
}

const saveALSession = async (
  session: IronSession<TUserSession>,
  body: TSessionPayload,
) => {
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
      },
    },
    { upsert: true, new: true },
  )
    .lean()
    .exec()) as TUserSchema;
  session.al = {
    act: body.access_token,
    exp: dayjs().add(365, "days").toISOString(),
  };
  session._id = user._id;
  await session.save();

  return user;
};
const saveMALSession = async (
  session: IronSession<TUserSession>,
  oldUser: TUserSchema,
  body: TSessionPayload,
) => {
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
  if (session.mal?.aut && session.mal?.cv && !session.mal?.act) {
    const auth = await authorizeMAL(session.mal.aut, session.mal.cv);
    session.mal = {
      act: auth.access_token,
      rft: auth.refresh_token,
      exp: dayjs().add(auth.expires_in, "seconds").toISOString(),
    };

    const MALClient = MyAnimeListClient(`Bearer ${session.mal.act}`);
    const MALUser = await getMALUserDetails(MALClient);
    if (MALUser) {
      user = (await User.findByIdAndUpdate(
        session._id,
        {
          myanimelist: {
            account_details: cloneDeep(MALUser),
          },
        },
        { upsert: true, new: true },
      )
        .lean()
        .exec()) as TUserSchema;
    }
  }

  await session.save();
  return user ?? oldUser;
};
