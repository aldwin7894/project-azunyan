"use client";

import useTheme from "@/hooks/useTheme";

export default function Home() {
  useTheme();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24"></div>
  );
}
