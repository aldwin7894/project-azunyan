import dbConnect from "./dbConnect";
import UserSchema from "@/models/User";
import { Client, cacheExchange, fetchExchange, gql } from "urql";

dbConnect();

const AnilistClient = (accessToken: string) => {
  return new Client({
    url: "https://graphql.anilist.co",
    exchanges: [cacheExchange, fetchExchange],
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

export const getUserByAccessToken = async (accessToken: string) => {
  return await UserSchema.findOne({
    al_access_token: accessToken,
  });
};
export const saveUser = async (accessToken: string) => {
  const ALUser = await AnilistClient(accessToken)
    .query(ViewerQuery, {})
    .toPromise();

  return await UserSchema.findOneAndUpdate(
    { "anilist.account_details.id": ALUser.data.Viewer.id },
    {
      anilist: {
        access_token: accessToken,
        account_details: { ...ALUser.data.Viewer },
      },
    },
    { upsert: true, new: true },
  );
};

export default AnilistClient;
