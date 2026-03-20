import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { createEdgeRouter } from "next-connect";
import MyAnimeListClient, { searchAnime } from "@/services/myanimelist";

const router = createEdgeRouter<NextRequest, NextFetchEvent>();
router.get(async req => {
  const client = MyAnimeListClient();
  const data = await searchAnime(client, {
    q: req.nextUrl.searchParams.get("q") ?? "",
    limit: req.nextUrl.searchParams.get("limit") ?? "10",
    offset: req.nextUrl.searchParams.get("offset") ?? "0",
    fields: req.nextUrl.searchParams.get("fields") ?? "",
  });
  return NextResponse.json(data);
});

export async function GET(req: NextRequest, res: NextFetchEvent) {
  return router.run(req, res) as Promise<NextResponse>;
}
