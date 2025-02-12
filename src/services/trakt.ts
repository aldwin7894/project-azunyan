import { TTraktAuthResponse, TTraktUserDetailsResponse } from "@/types/trakt";
import axios, { AxiosInstance } from "axios";

export const TraktClient = (Authorization: string | null = null) =>
  axios.create({
    baseURL: "https://api.trakt.tv",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization,
      "trakt-api-version": "2",
      "trakt-api-key": process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID,
    },
    timeout: 60000,
  });

export const authorizeTrakt = async (
  authorization_token: string,
): Promise<TTraktAuthResponse> => {
  const params = {
    code: authorization_token,
    client_id: process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_TRAKT_CLIENT_SECRET,
    redirect_uri: `${process.env.NEXT_PUBLIC_HOST}/trakt/auth`,
    grant_type: "authorization_code",
  };

  return TraktClient()
    .post("/oauth/token", params)
    .then(res => res.data);
};

export const refreshTraktToken = async (
  access_token: string,
  refresh_token: string,
) => {
  const params = new URLSearchParams();
  params.append("client_id", process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID as string);
  params.append(
    "client_secret",
    process.env.NEXT_PUBLIC_TRAKT_CLIENT_SECRET as string,
  );
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refresh_token);
  params.append("redirect_uri", `${process.env.NEXT_PUBLIC_HOST}/trakt/auth`);

  return TraktClient()
    .post("/oauth/token", params)
    .then(res => res.data as TTraktAuthResponse);
};

export const getTraktUserDetails = async (
  client: AxiosInstance,
): Promise<TTraktUserDetailsResponse> => {
  const res = await client.get("/users/settings");
  return res.data;
};

export default TraktClient;
