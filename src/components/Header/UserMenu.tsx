"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Modal from "../common/Modal";
import Link from "next/link";
import getPkce from "oauth-pkce";
import { TUserSchema } from "@/models/User";
import { TUserSession } from "@/types/session";

type TProps = {
  session: TUserSession;
  user: TUserSchema;
};

export default function UserMenu({ session, user }: Readonly<TProps>) {
  const settingsModal = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [pkce, setPkce] = useState<{
    verifier: string;
    challenge: string;
  }>();

  const handleLogout = async () => {
    (document.activeElement as HTMLElement | null)?.blur();

    await fetch("/api/session", {
      method: "DELETE",
    });
    router.replace("/");
    router.refresh();
  };
  const redirectToMalAuth = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    await fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        code_verifier: pkce?.challenge,
        type: "MAL",
      }),
    });

    if (!session.mal?.aut) {
      router.push(
        `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_MAL_CLIENT_ID}&code_challenge=${pkce?.challenge}`,
      );
    }
  };
  const redirectToSimklAuth = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log(session?.simkl);
    if (!session.simkl?.aut) {
      router.push(
        `https://simkl.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_SIMKL_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_HOST}/simkl/auth`,
      );
    }
  };
  const redirectToTraktAuth = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log(session?.trakt);
    if (!session.trakt?.aut) {
      router.push(
        `https://trakt.tv/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_HOST}/trakt/auth`,
      );
    }
  };

  useEffect(() => {
    getPkce(50, (_, { verifier, challenge }) => {
      setPkce({ verifier, challenge });
    });
  }, []);

  if (!session.al) return;

  return (
    <>
      <Modal ref={settingsModal} title="Settings" saveLabel="Confirm">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-4">
            <span className="icon-[simple-icons--anilist] size-8"></span>
            {session.al && user?.anilist?.account_details?.siteUrl && (
              <Link
                href={user?.anilist?.account_details?.siteUrl}
                className="hover:text-blue-400 hover:underline"
                target="_blank"
              >
                {user?.anilist?.account_details?.name}
              </Link>
            )}
          </div>

          <div className="flex flex-row flex-wrap items-center gap-4">
            <span className="icon-[simple-icons--myanimelist] size-8"></span>
            {session?.mal && user?.myanimelist?.account_details?.name ? (
              <Link
                href={`https://myanimelist.net/profile/${user.myanimelist.account_details.name}`}
                className="hover:text-blue-400 hover:underline"
                target="_blank"
              >
                {user?.myanimelist?.account_details?.name}
              </Link>
            ) : (
              <Link
                href="#"
                className="btn btn-primary flex items-center text-white"
                onClick={redirectToMalAuth}
              >
                <span>Login</span>
              </Link>
            )}
          </div>

          <div className="flex flex-row flex-wrap items-center gap-4">
            <span className="icon-[simple-icons--simkl] size-8"></span>
            {session?.simkl && user?.simkl?.account_details?.id ? (
              <Link
                href={`https://simkl.com/${user.simkl.account_details.id}`}
                className="hover:text-blue-400 hover:underline"
                target="_blank"
              >
                {user?.simkl?.account_details?.name}
              </Link>
            ) : (
              <Link
                href="#"
                className="btn btn-primary flex items-center text-white"
                onClick={redirectToSimklAuth}
              >
                <span>Login</span>
              </Link>
            )}
          </div>

          <div className="flex flex-row flex-wrap items-center gap-4">
            <span className="icon-[simple-icons--trakt] size-8"></span>
            {session?.trakt && user?.trakt?.account_details?.id ? (
              <Link
                href={`https://trakt.tv/users/${user.trakt.account_details.slug}`}
                className="hover:text-blue-400 hover:underline"
                target="_blank"
              >
                {user?.trakt?.account_details?.username}
              </Link>
            ) : (
              <Link
                href="#"
                className="btn btn-primary flex items-center text-white"
                onClick={redirectToTraktAuth}
              >
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </Modal>

      <ul className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-300 p-2 shadow">
        <li>
          <a onClick={() => settingsModal.current?.showModal()} href="#">
            Settings
          </a>
        </li>
        <li>
          <a onClick={handleLogout} href="#">
            Logout
          </a>
        </li>
      </ul>
    </>
  );
}
