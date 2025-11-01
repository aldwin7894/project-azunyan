import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { createEdgeRouter } from "next-connect";
import getSession from "@/utils/get-session";
import AnilistClient, { UserAnimeListQuery } from "@/services/anilist";
import { TAnimeList } from "@/types/anilist";
import CryptoUtil from "@/utils/crypto";

const router = createEdgeRouter<NextRequest, NextFetchEvent>();
router.get(async () => {
  const { user, session } = await getSession();

  if (!user.anilist?.auth_details?.access_token || !session._id)
    return NextResponse.json([]);

  const token = CryptoUtil.decryptSymmetric(
    user.anilist.auth_details.access_token,
  );
  const data = await AnilistClient(token)
    .query<TAnimeList>(UserAnimeListQuery, {
      userId: session._id,
    })
    .toPromise();
  return NextResponse.json(data.data?.Watching.lists?.[0]?.entries ?? []);
});

export async function GET(req: NextRequest, res: NextFetchEvent) {
  return router.run(req, res) as Promise<NextResponse>;
}
