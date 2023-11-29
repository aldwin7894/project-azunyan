import { useThemeStore } from "@/stores/theme-store";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function useTheme() {
  const [theme, toggleTheme] = useThemeStore(
    useShallow(state => [state.theme, state.toggleTheme]),
  );

  useEffect(() => {
    const root = window.document.body;
    root.dataset.theme = theme;
  }, [theme]);

  return { theme, toggleTheme };
}
