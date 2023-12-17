"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Modal from "../common/Modal";
import { UserSession } from "@/types/session";
import Link from "next/link";
import getPkce from "oauth-pkce";

type TProps = {
  session: UserSession;
};

export default function UserMenu({ session }: Readonly<TProps>) {
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

  useEffect(() => {
    getPkce(50, (error, { verifier, challenge }) => {
      setPkce({ verifier, challenge });
    });
  }, []);

  if (!session.anilist) return;

  return (
    <>
      <Modal ref={settingsModal} title="Settings" saveLabel="Confirm">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-4">
            <span className="icon-[simple-icons--anilist] h-8 w-8"></span>
            {session.anilist.account_details?.siteUrl && (
              <Link
                href={session.anilist?.account_details?.siteUrl}
                className="hover:text-blue-400 hover:underline"
              >
                {session.anilist?.account_details?.name}
              </Link>
            )}
          </div>

          <div className="flex flex-row flex-wrap items-center gap-4">
            <span className="icon-[simple-icons--myanimelist] h-8 w-8"></span>
            {session.mal?.account_details?.siteUrl ? (
              <Link
                href={session.mal?.account_details.siteUrl}
                className="hover:text-blue-400 hover:underline"
              >
                {session.mal?.account_details.name}
              </Link>
            ) : (
              <Link
                href={`https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_MAL_CLIENT_ID}&code_challenge=${pkce?.challenge}`}
                className="btn btn-primary flex items-center text-white"
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
