"use client";

import Loader from "@/components/common/Loader";
import AnimeList from "@/components/Home/AnimeList";
import { TAnimeEntry } from "@/types/anilist";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

export default function Home() {
  const { data, isLoading } = useSWR(
    "/api/anilist/animelist",
    fetcher<TAnimeEntry[]>,
  );

  if (isLoading) return <Loader />;

  return <AnimeList data={data} />;
}
