"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Auth() {
  const router = useRouter();
  const params = useSearchParams();
  const run = useRef(false);

  useEffect(() => {
    const saveMalUser = async () => {
      run.current = true;
      const authorization_token = params.get("code");

      if (authorization_token) {
        await fetch("/api/session", {
          method: "POST",
          body: JSON.stringify({ authorization_token, type: "MAL" }),
        });
      }

      router.replace("/");
      router.refresh();
    };

    if (!run.current) {
      saveMalUser();
    }
  }, [params, router]);

  return <div>Authenticating...</div>;
}
