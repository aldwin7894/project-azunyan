export type AnimeList = {
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
