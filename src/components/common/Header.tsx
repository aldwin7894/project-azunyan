"use client";

import { useThemeStore } from "@/stores/theme-store";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";

export default function Header() {
  const [toggleTheme] = useThemeStore(useShallow(state => [state.toggleTheme]));

  return (
    <nav className="sticky inset-x-0 top-0 flex h-[60px] items-center justify-between bg-red-500 px-4 py-2">
      <div>a</div>
      <div className="flex flex-row gap-2">
        <label className="swap swap-flip">
          <input onClick={toggleTheme} type="checkbox" />
          <div className="swap-on">
            <Icon icon="uil:moon" width={30} color="black" />
          </div>
          <div className="swap-off">
            <Icon icon="uil:sun" width={30} color="white" />
          </div>
        </label>
        <Link
          href={`https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID}&response_type=token`}
          className="btn btn-primary"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
