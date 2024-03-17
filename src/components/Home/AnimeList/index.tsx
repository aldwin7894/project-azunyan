import AnilistClient, { UserAnimeListQuery } from "@/services/anilist";
import { TAnimeList } from "@/types/anilist";
import AnimeEntry from "./AnimeEntry";
import getSession from "@/utils/get-session";

export default async function AnimeList() {
  const { session } = await getSession();

  if (!session?.al?.act) return;

  const data = await AnilistClient(session.al.act)
    .query<TAnimeList>(UserAnimeListQuery, {
      userId: session._id,
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
