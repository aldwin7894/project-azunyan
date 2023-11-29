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
    <div className="grid flex-1 grid-cols-6 gap-8">
      {data.data?.Watching.lists[0].entries.map(anime => {
        return (
          <div key={anime.id} className="group flex flex-col items-center">
            <div className="relative h-[326px] w-[230px] overflow-hidden rounded-md">
              <Image
                src={anime.media.coverImage.large}
                fill={true}
                alt={anime.media.title.userPreferred}
                sizes="230px"
                quality={100}
                className="absolute left-0 top-0 h-full w-full object-cover object-center"
              />
              <div className="invisible absolute right-3 top-3 flex cursor-pointer items-center rounded-md bg-primary/90 text-white group-hover:visible">
                <span className="icon-[mdi--dots-horizontal] z-[2] h-8 w-8"></span>
              </div>
              <h1 className="absolute bottom-0 left-0 z-[1] w-full bg-neutral/80 p-3 pb-9 text-white">
                {anime.media.title.userPreferred}
              </h1>
              <h1 className="absolute bottom-0 left-0 z-[2] p-3 font-semibold text-primary">
                {anime.progress} / {anime.media.episodes}
                <span className="invisible ml-1 cursor-pointer group-hover:visible">
                  +
                </span>
              </h1>
              <h1 className="absolute bottom-0 right-0 z-[2] p-3 font-semibold text-primary">
                {anime.score}
              </h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}
