"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function UserMenu() {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/session", {
      method: "DELETE",
    });
    router.refresh();
  };

  return (
    <ul className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-300 p-2 shadow">
      <li>
        <a>Settings</a>
      </li>
      <li>
        <a onClick={handleLogout} href="#">
          Logout
        </a>
      </li>
    </ul>
  );
}
