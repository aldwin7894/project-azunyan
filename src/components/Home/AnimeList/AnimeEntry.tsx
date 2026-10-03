"use client";

import Card from "@/components/common/Card";
import Modal from "@/components/common/Modal";
import SearchInput from "@/components/common/SearchInputButton";
import SearchModal from "@/components/common/SearchModal";
import { TUserSchema } from "@/models/User";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type Props = {
  id: number;
  image: string;
  bannerImage: string;
  title: string;
  currentProgress: number;
  totalEpisodes: number;
  rating: number;
  user?: TUserSchema;
  status?: string;
};

export default function AnimeEntry({
  id,
  image,
  bannerImage,
  title,
  currentProgress,
  totalEpisodes,
  rating,
  status,
}: Readonly<Props>) {
  const [currentRating, setCurrentRating] = useState(rating ?? 0);
  const [searchType, setSearchType] = useState<
    "mal" | "trakt" | "simkl" | undefined
  >();

  const editModal = useRef<HTMLDialogElement>(null);
  const episodeModal = useRef<HTMLDialogElement>(null);
  const searchModal = useRef<HTMLDialogElement>(null);

  const handleUpdateEpisode = () => {
    console.info("TODO: INTEGRATE UPDATE EPISODE");
  };
  const handleUpdateMapping = () => {
    console.info("TODO: INTEGRATE UPDATE MAPPING");
  };

  const showSearchModal = (type: "mal" | "trakt" | "simkl") => {
    setSearchType(type);
    searchModal.current?.showModal();
  };

  return (
    <>
      <div key={id} className="group flex flex-col items-center">
        <div className="relative h-81.5 w-57.5 overflow-hidden rounded-md">
          <Image
            loading="eager"
            src={image}
            alt={title}
            fill
            sizes="230px"
            quality={100}
            className="absolute top-0 left-0 size-full object-cover object-center"
          />
          <button
            className="invisible absolute top-3 right-3 flex items-center rounded-md bg-primary/90 text-white group-hover:visible"
            onClick={() => editModal.current?.showModal()}
          >
            <span className="z-2 icon-[mdi--dots-horizontal] size-8"></span>
          </button>
          <div className="absolute bottom-0 left-0 w-full bg-neutral/80 p-3 pb-9">
            <h1 className="line-clamp-3 font-semibold text-white">{title}</h1>
          </div>
          <h1 className="absolute bottom-0 left-0 z-2 p-3 font-semibold text-primary">
            {currentProgress} / {totalEpisodes}
            <button
              className="invisible ml-1 cursor-pointer group-hover:visible"
              onClick={() => episodeModal.current?.showModal()}
            >
              +
            </button>
          </h1>
          <h1 className="absolute right-0 bottom-0 z-2 p-3 font-semibold text-primary">
            {rating}
          </h1>
        </div>
      </div>

      <Modal
        ref={editModal}
        title={title}
        saveLabel="Confirm"
        onSave={handleUpdateMapping}
        headerImage={bannerImage}
      >
        <div className="absolute top-20 left-7 h-81.5 w-57.5 overflow-hidden rounded-md">
          <Image
            loading="eager"
            src={image}
            alt={title}
            quality={100}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="sticky rounded-xs"
          />
        </div>

        <div className="ml-70 flex flex-col gap-2">
          <div className="rating">
            {Array.from({ length: 10 }, (_, i) => (
              <input
                key={i}
                type="radio"
                name="rating-1"
                className="mask mask-star"
                aria-label={`${i + 1} star`}
                value={`${i + 1}`}
                defaultChecked={currentRating === i + 1}
                onChange={e =>
                  setCurrentRating(Number.parseInt(e.target.value))
                }
              />
            ))}
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Status</legend>
            <select defaultValue={status} className="select">
              <option>CURRENT</option>
              <option>PLANNING</option>
              <option>COMPLETED</option>
              <option>DROPPED</option>
              <option>PAUSED</option>
              <option>REPEATING</option>
            </select>
          </fieldset>

          <Card
            title="AniList"
            actions={
              <Link
                href={`https://anilist.co/anime/${id}`}
                className="btn flex items-center btn-secondary"
                target="_blank"
              >
                <span>View</span>
              </Link>
            }
          ></Card>
          <Card title="MyAnimeList">
            <SearchInput onClick={() => showSearchModal("mal")} />
          </Card>
          <Card title="SIMKL">test</Card>
          <Card title="Trakt">test</Card>
        </div>
      </Modal>

      <Modal
        ref={episodeModal}
        title="Update Watched Progress"
        saveLabel="Confirm"
        onSave={handleUpdateEpisode}
      >
        Update watched progress to episode{" "}
        <strong>{currentProgress + 1}</strong>?
      </Modal>

      <SearchModal
        ref={searchModal}
        searchType={searchType}
        onClose={() => setSearchType(undefined)}
      />
    </>
  );
}
