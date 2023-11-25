"use client";

import { useThemeStore } from "@/stores/theme-store";
import { ReactNode } from "react";
import { useShallow } from "zustand/react/shallow";

type Props = {
  children?: ReactNode;
};

export default function Theme({ children }: Readonly<Props>) {
  const [theme] = useThemeStore(useShallow(state => [state.theme]));

  return <div data-theme={theme}>{children}</div>;
}
