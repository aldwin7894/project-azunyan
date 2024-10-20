import { TSimklAuthResponse, TSimklUserDetailsResponse } from "@/types/simkl";
import axios, { AxiosInstance } from "axios";

export const SimklClient = (Authorization: string | null = null) =>
  axios.create({
    baseURL: "https://api.simkl.com",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization,
      "simkl-api-key": process.env.NEXT_PUBLIC_SIMKL_CLIENT_ID,
    },
    timeout: 60000,
  });

export const authorizeSimkl = async (
  authorization_token: string,
): Promise<TSimklAuthResponse> => {
  const params = {
    code: authorization_token,
    client_id: process.env.NEXT_PUBLIC_SIMKL_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_SIMKL_CLIENT_SECRET,
    redirect_uri: `${process.env.NEXT_PUBLIC_HOST}/simkl/auth`,
    grant_type: "authorization_code",
  };

  return SimklClient()
    .post("/oauth/token", params)
    .then(res => res.data);
};

export const getSimklUserDetails = async (
  client: AxiosInstance,
): Promise<TSimklUserDetailsResponse> => {
  const res = await client.get("/users/settings");
  return res.data;
};

export default SimklClient;
