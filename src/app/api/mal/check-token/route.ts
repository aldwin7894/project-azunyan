import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { createEdgeRouter } from "next-connect";
import getSession from "@/utils/get-session";
import dayjs from "dayjs";
import { refreshMALToken } from "@/services/myanimelist";
import User from "@/models/User";

const router = createEdgeRouter<NextRequest, NextFetchEvent>();
router.get(async () => {
  const { user, session } = await getSession();
  const { expires_in, refresh_token, access_token } =
    user?.myanimelist?.auth_details ?? {};
  if (!access_token || !refresh_token || !expires_in) {
    return NextResponse.json({ valid: false });
  }

  const expireDate = dayjs(expires_in).subtract(1, "week");
  if (dayjs() >= expireDate) {
    const response = await refreshMALToken(access_token, refresh_token);
    await User.findByIdAndUpdate(session._id, {
      $set: {
        "myanimelist.auth_details": {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          expires_in: dayjs().add(response.expires_in, "seconds").toISOString(),
        },
      },
    });
  }

  return NextResponse.json({ valid: true });
});

export async function GET(req: NextRequest, res: NextFetchEvent) {
  return router.run(req, res) as Promise<NextResponse>;
}
