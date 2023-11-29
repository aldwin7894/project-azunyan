import AnilistClient, { UserAnimeListQuery } from "@/services/anilist";
import { AnimeList } from "@/types/anilist";
import { UserSession } from "@/types/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function AnimeList() {
  const session = await getIronSession<UserSession>(cookies(), {
    password: process.env["NEXT_PUBLIC_MASTER_KEY"] as string,
    cookieName: "auth",
    ttl: 0,
  });

  if (!session?.anilist?.access_token) return;

  const data = await AnilistClient(session.anilist.access_token)
    .query<AnimeList>(UserAnimeListQuery, {
      userId: session.anilist.account_details.id,
    })
    .toPromise();

  return (
    <div className="grid flex-1 grid-cols-6 gap-2">
      {data.data?.Watching.lists[0].entries.map(anime => {
        return (
          <div key={anime.id} className="flex flex-col items-center">
            <div className="relative h-[326px] w-[230px] overflow-hidden">
              <Image
                src={anime.media.coverImage.large}
                fill={true}
                alt={anime.media.title.userPreferred}
                sizes="230px"
                quality={100}
                className="object-cover object-center"
              />
            </div>

            <h1 className="text-center">{anime.media.title.userPreferred}</h1>
          </div>
        );
      })}
    </div>
  );
}
