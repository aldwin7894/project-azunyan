import { TMALAuthResponse } from "@/types/myanimelist";
import axios, { AxiosInstance } from "axios";

export const MyAnimeListClient = (Authorization: string | null = null) =>
  axios.create({
    baseURL: "https://api.myanimelist.net/v2/",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization,
    },
    timeout: 60000,
  });

export const authorizeMAL = async (
  authorization_token: string,
  code_verifier: string,
) => {
  const client = axios.create({
    baseURL: "https://myanimelist.net/v1/",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    timeout: 60000,
  });

  const params = new URLSearchParams();
  params.append("client_id", process.env.NEXT_PUBLIC_MAL_CLIENT_ID as string);
  params.append(
    "client_secret",
    process.env.NEXT_PUBLIC_MAL_CLIENT_SECRET as string,
  );
  params.append("grant_type", "authorization_code");
  params.append("code", authorization_token);
  params.append("code_verifier", code_verifier);

  return client
    .post("/oauth2/token", params)
    .then(res => res.data as TMALAuthResponse);
};

export const getMALUserDetails = async (client: AxiosInstance) => {
  const res = await client.get("/users/@me");
  return res.data;
};

export default MyAnimeListClient;
