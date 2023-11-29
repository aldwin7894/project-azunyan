"use client";

import useTheme from "@/hooks/useTheme";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const { toggleTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <button
        className={clsx("swap swap-flip", theme === "dark" && "swap-active")}
        onClick={toggleTheme}
      >
        <div className="swap-on h-8 w-8">
          <span className="icon-[mdi--white-balance-sunny] h-full w-full  text-white" />
        </div>
        <div className="swap-off h-8 w-8">
          <span className="icon-[mdi--weather-night]  h-full w-full text-black" />
        </div>
      </button>
    )
  );
}
