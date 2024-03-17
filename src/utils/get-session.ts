import User, { TUserSchema } from "@/models/User";
import dbConnect from "@/services/dbConnect";
import { TUserSession } from "@/types/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const getSession = async () => {
  await dbConnect();
  const session = await getIronSession<TUserSession>(cookies(), {
    password: process.env["NEXT_PUBLIC_MASTER_KEY"] as string,
    cookieName: "auth",
    ttl: 0,
  });

  return {
    session,
    user: session._id
      ? ((await User.findById(session._id).lean()) as TUserSchema)
      : ({} as TUserSchema),
  };
};

export default getSession;
