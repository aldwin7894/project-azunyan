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
