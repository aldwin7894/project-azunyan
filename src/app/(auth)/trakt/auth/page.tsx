"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

function Auth() {
  const router = useRouter();
  const params = useSearchParams();
  const run = useRef(false);

  useEffect(() => {
    const saveTraktUser = async () => {
      run.current = true;
      const authorization_token = params.get("code");

      if (authorization_token) {
        await fetch("/api/session", {
          method: "POST",
          body: JSON.stringify({ authorization_token, type: "TRAKT" }),
        });
      }

      router.replace("/");
      router.refresh();
    };

    if (!run.current) {
      saveTraktUser();
    }
  }, [params, router]);

  return <div>Authenticating...</div>;
}

export default function TraktAuthPage() {
  return (
    <Suspense>
      <Auth />
    </Suspense>
  );
}
