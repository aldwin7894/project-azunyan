import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { createEdgeRouter } from "next-connect";
import { saveUser } from "@/services/anilist";

const router = createEdgeRouter<NextRequest, NextFetchEvent>();
router.post(async req => {
  const { access_token } = await req.json();
  const user = await saveUser(access_token);
  return NextResponse.json({ user });
});

export async function POST(req: NextRequest, res: NextFetchEvent) {
  return router.run(req, res);
}
