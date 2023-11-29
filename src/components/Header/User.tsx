import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { UserSession } from "@/types/session";
import Link from "next/link";
import Image from "next/image";
import UserMenu from "./UserMenu";

export default async function User() {
  const session = await getIronSession<UserSession>(cookies(), {
    password: process.env["NEXT_PUBLIC_MASTER_KEY"] as string,
    cookieName: "auth",
    ttl: 0,
  });

  if (!session.anilist) {
    return (
      <Link
        href={`https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID}&response_type=token`}
        className="btn btn-primary flex items-center text-white"
      >
        <span className="icon-[simple-icons--anilist] h-5 w-5" />
        <span>Login</span>
      </Link>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="avatar btn btn-circle btn-ghost">
        <Image
          alt="Avatar"
          src={session.anilist.account_details.avatar.medium}
          width={40}
          height={40}
          className="rounded-full object-cover object-center"
        />
      </button>
      <UserMenu />
    </div>
  );
}
