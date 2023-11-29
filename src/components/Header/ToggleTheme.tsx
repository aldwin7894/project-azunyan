"use client";

import useTheme from "@/hooks/useTheme";

export default function ToggleTheme() {
  const { toggleTheme } = useTheme();

  return (
    <label className="swap swap-flip">
      <input onClick={toggleTheme} type="checkbox" />
      <div className="swap-on h-8 w-8">
        <span className="icon-[mdi--white-balance-sunny] h-full w-full  text-white" />
      </div>
      <div className="swap-off h-8 w-8">
        <span className="icon-[mdi--weather-night]  h-full w-full text-black" />
      </div>
    </label>
  );
}
