import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { createEdgeRouter } from "next-connect";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import AnilistClient, { ViewerQuery } from "@/services/anilist";
import dayjs from "dayjs";
import { UserSession } from "@/types/session";

const router = createEdgeRouter<NextRequest, NextFetchEvent>();
router
  .get(async () => {
    const session = await getIronSession<UserSession>(cookies(), {
      password: process.env["NEXT_PUBLIC_MASTER_KEY"] as string,
      cookieName: "auth",
      ttl: 0,
    });

    return NextResponse.json({ ...session });
  })
  .post(async req => {
    const { access_token } = await req.json();
    const ALUser = await AnilistClient(access_token)
      .query(ViewerQuery, {})
      .toPromise();
    const session = await getIronSession<UserSession>(cookies(), {
      password: process.env["NEXT_PUBLIC_MASTER_KEY"] as string,
      cookieName: "auth",
      ttl: 0,
    });
    session.anilist = {
      access_token: access_token,
      expiration: dayjs().add(365, "days").toISOString(),
      account_details: { ...ALUser.data.Viewer },
    };
    await session.save();

    return NextResponse.json({ ...session });
  })
  .delete(async () => {
    const session = await getIronSession<UserSession>(cookies(), {
      password: process.env["NEXT_PUBLIC_MASTER_KEY"] as string,
      cookieName: "auth",
    });
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
