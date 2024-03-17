export type TAnimeList = {
  Watching: {
    hasNextChunk: boolean;
    lists: [
      {
        name: string;
        entries: [
          {
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
              status: string;
              episodes: number;
            };
          },
        ];
      },
    ];
  };
};
