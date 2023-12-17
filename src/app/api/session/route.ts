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

const router = createEdgeRouter<NextRequest, NextFetchEvent>();
router
  .get(async () => {
    const session = await getSession();

    return NextResponse.json({ ...session });
  })
  .post(async req => {
    const { access_token, authorization_token, type } = await req.json();
    const session = await getSession();
    let ALUser;

    switch (type) {
      case "AL":
        ALUser = await AnilistClient(access_token)
          .query(ViewerQuery, {})
          .toPromise();
        session.anilist = {
          access_token: access_token,
          expiration: dayjs().add(365, "days").toISOString(),
          account_details: cloneDeep(ALUser.data.Viewer),
        };
        await session.save();
        break;
      case "MAL":
        session.mal = {
          authorization_token,
          access_token: undefined,
          expiration: undefined,
          account_details: {},
        };
        await session.save();
        break;
      default:
        break;
    }

    return NextResponse.json({ ...session });
  })
  .delete(async () => {
    const session = await getSession();
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
