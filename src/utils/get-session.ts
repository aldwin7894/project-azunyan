import { UserSession } from "@/types/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const getSession = async () =>
  await getIronSession<UserSession>(cookies(), {
    password: process.env["NEXT_PUBLIC_MASTER_KEY"] as string,
    cookieName: "auth",
    ttl: 0,
  });

export default getSession;
