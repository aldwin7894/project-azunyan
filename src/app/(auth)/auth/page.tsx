"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Auth() {
  const router = useRouter();
  const run = useRef(false);

  useEffect(() => {
    const saveAnilistUser = async () => {
      run.current = true;
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1, hash.length - 1));
      const access_token = params.get("access_token");

      if (access_token) {
        await fetch("/api/session", {
          method: "POST",
          body: JSON.stringify({ access_token, type: "AL" }),
        });
      }

      router.replace("/");
      router.refresh();
    };

    if (!run.current) {
      saveAnilistUser();
    }
  }, [router]);

  return <div>Authenticating...</div>;
}
