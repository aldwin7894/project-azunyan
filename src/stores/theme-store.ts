import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

type ThemeStore = {
  theme: string;
  toggleTheme: () => void;
};

export const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => ({
      theme: get()?.theme || "dark",
      toggleTheme: () => {
        set(state => ({
          theme: state.theme === "light" ? "dark" : "light",
        }));
      },
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("ThemeStore", useThemeStore);
}
