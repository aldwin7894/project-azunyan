import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { createEdgeRouter } from "next-connect";
import getSession from "@/utils/get-session";
import dayjs from "dayjs";
import User from "@/models/User";
import { refreshTraktToken } from "@/services/trakt";

const router = createEdgeRouter<NextRequest, NextFetchEvent>();
router.get(async () => {
  const { user, session } = await getSession();
  const { expires_in, refresh_token, access_token, created_at } =
    user?.trakt?.auth_details ?? {};
  if (!access_token || !refresh_token || !expires_in) {
    return NextResponse.json({ valid: false });
  }

  const expireDate = dayjs(created_at).subtract(2, "hours");
  if (dayjs() >= expireDate) {
    const response = await refreshTraktToken(access_token, refresh_token);
    await User.findByIdAndUpdate(session._id, {
      $set: {
        "trakt.auth_details": {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          expires_in: dayjs().add(response.expires_in, "seconds").toISOString(),
          created_at: dayjs.unix(response.created_at).toISOString(),
        },
      },
    });
  }

  return NextResponse.json({ valid: true });
});

export async function GET(req: NextRequest, res: NextFetchEvent) {
  return router.run(req, res) as Promise<NextResponse>;
}
