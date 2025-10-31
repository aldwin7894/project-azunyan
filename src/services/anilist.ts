import { Client, cacheExchange, fetchExchange, gql } from "urql/core";

const AnilistClient = (accessToken: string) => {
  return new Client({
    url: "https://graphql.anilist.co",
    exchanges: [cacheExchange, fetchExchange],
    preferGetMethod: false,
    fetchOptions: {
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });
};

export const ViewerQuery = gql`
  {
    Viewer {
      id
      name
      siteUrl
      avatar {
        medium
      }
    }
  }
`;
export const UserAnimeListQuery = gql`
  fragment mediaListEntry on MediaList {
    id
    mediaId
    status
    progress
    score
    media {
      id
      type
      title {
        userPreferred
      }
      coverImage {
        large
      }
      status(version: 2)
      episodes
    }
  }
  fragment Lists on MediaListCollection {
    hasNextChunk
    lists {
      name
      entries {
        ...mediaListEntry
      }
    }
  }

  query UserAnimeList($userId: Int) {
    Watching: MediaListCollection(
      userId: $userId
      type: ANIME
      perChunk: 500
      chunk: 1
      status: CURRENT
      sort: UPDATED_TIME_DESC
    ) {
      ...Lists
    }
  }
`;

export default AnilistClient;
