import AnilistClient, { UserAnimeListQuery } from "@/services/anilist";
import { AnimeList } from "@/types/anilist";
import AnimeEntry from "./AnimeEntry";
import getSession from "@/utils/get-session";

export default async function AnimeList() {
  const session = await getSession();

  if (!session?.anilist?.access_token) return;

  const data = await AnilistClient(session.anilist.access_token)
    .query<AnimeList>(UserAnimeListQuery, {
      userId: session.anilist.account_details?.id,
    })
    .toPromise();

  return (
    <div className="grid flex-1 grid-cols-6 gap-8">
      {data.data?.Watching.lists[0].entries.map(anime => (
        <AnimeEntry
          id={anime.id}
          image={anime.media.coverImage.large}
          currentProgress={anime.progress}
          rating={anime.score}
          title={anime.media.title.userPreferred}
          totalEpisodes={anime.media.episodes}
          key={anime.id}
        />
      ))}
    </div>
  );
}
