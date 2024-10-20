import Link from "next/link";
import Image from "next/image";
import UserMenu from "./UserMenu";
import getSession from "@/utils/get-session";

export default async function UserHeader() {
  const { session, user } = await getSession();

  if (!user.anilist?.account_details?.avatar?.medium) {
    return (
      <Link
        href={`https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID}&response_type=token`}
        className="btn btn-primary flex items-center text-white"
      >
        <span className="icon-[simple-icons--anilist] size-5" />
        <span>Login</span>
      </Link>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="avatar btn btn-circle btn-ghost">
        <Image
          alt="Avatar"
          src={user.anilist.account_details.avatar.medium}
          width={40}
          height={40}
          className="rounded-full object-cover object-center"
        />
      </button>
      <UserMenu session={JSON.parse(JSON.stringify(session))} user={user} />
    </div>
  );
}
