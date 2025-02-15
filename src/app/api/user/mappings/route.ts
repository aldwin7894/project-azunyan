import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { createEdgeRouter } from "next-connect";
import getSession from "@/utils/get-session";

const router = createEdgeRouter<NextRequest, NextFetchEvent>();
router.get(async () => {
  const { user } = await getSession();
  return NextResponse.json([...user.xref_mappings]);
});

export async function GET(req: NextRequest, res: NextFetchEvent) {
  return router.run(req, res) as Promise<NextResponse>;
}
