"use client";

import useTheme from "@/hooks/useTheme";
import clsx from "clsx";

export default function ToggleTheme() {
  const { toggleTheme, theme } = useTheme();

  return (
    <button
      className={clsx("swap swap-flip", theme !== "cupcake" && "swap-active")}
      onClick={toggleTheme}
    >
      <div className="swap-on h-8 w-8">
        <span className="icon-[mdi--white-balance-sunny] h-full w-full  text-white" />
      </div>
      <div className="swap-off h-8 w-8">
        <span className="icon-[mdi--weather-night]  h-full w-full text-black" />
      </div>
    </button>
  );
}
