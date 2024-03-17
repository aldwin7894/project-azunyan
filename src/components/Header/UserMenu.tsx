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
  const redirectToMalAuth = async () => {
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
            <span className="icon-[simple-icons--anilist] h-8 w-8"></span>
            {user?.anilist?.account_details?.siteUrl && (
              <Link
                href={user?.anilist?.account_details?.siteUrl}
                className="hover:text-blue-400 hover:underline"
              >
                {user?.anilist?.account_details?.name}
              </Link>
            )}
          </div>

          <div className="flex flex-row flex-wrap items-center gap-4">
            <span className="icon-[simple-icons--myanimelist] h-8 w-8"></span>
            {user?.myanimelist?.account_details?.name ? (
              <Link
                href={`https://myanimelist.net/profile/${user.myanimelist.account_details.name}`}
                className="hover:text-blue-400 hover:underline"
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
