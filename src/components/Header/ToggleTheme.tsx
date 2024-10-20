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
        <div className="swap-on size-8">
          <span className="icon-[mdi--white-balance-sunny] size-full text-white" />
        </div>
        <div className="swap-off size-8">
          <span className="icon-[mdi--weather-night]  size-full text-black" />
        </div>
      </button>
    )
  );
}
