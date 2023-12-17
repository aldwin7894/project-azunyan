import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { createEdgeRouter } from "next-connect";

const router = createEdgeRouter<NextRequest, NextFetchEvent>();
router.get(async () => {
  return NextResponse.json({ success: true });
});

export async function GET(req: NextRequest, res: NextFetchEvent) {
  return router.run(req, res);
}
