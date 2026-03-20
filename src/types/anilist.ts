export type TALAnimeList = {
  Watching: {
    hasNextChunk: boolean;
    lists: [
      {
        name: string;
        entries: [TALAnimeEntry];
      },
    ];
  };
};

export type TALAnimeEntry = {
  id: number;
  mediaId: number;
  status: string;
  progress: number;
  score: number;
  media: {
    id: number;
    type: string;
    title: {
      userPreferred: string;
    };
    coverImage: {
      large: string;
    };
    bannerImage: string;
    status: string;
    episodes: number;
  };
};
