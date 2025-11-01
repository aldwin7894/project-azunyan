import { TAnimeEntry } from "@/types/anilist";
import AnimeEntry from "./AnimeEntry";
import { TUserSchema } from "@/models/User";

type Props = {
  data?: TAnimeEntry[];
  user?: TUserSchema;
};
export default function AnimeList({ data, user }: Readonly<Props>) {
  return (
    <div className="grid flex-1 grid-cols-6 gap-8">
      {data?.map(anime => (
        <AnimeEntry
          id={anime.mediaId}
          image={anime.media.coverImage.large}
          currentProgress={anime.progress}
          rating={anime.score}
          title={anime.media.title.userPreferred}
          totalEpisodes={anime.media.episodes}
          status={anime.status}
          key={anime.mediaId}
          user={user}
        />
      ))}
    </div>
  );
}
