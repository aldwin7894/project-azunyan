"use client";

import Card from "@/components/common/Card";
import Modal from "@/components/common/Modal";
import { TUserSchema } from "@/models/User";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type Props = {
  id: number;
  image: string;
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
  title,
  currentProgress,
  totalEpisodes,
  rating,
  status,
}: Readonly<Props>) {
  const [currentRating, setCurrentRating] = useState(rating ?? 0);
  const editModal = useRef<HTMLDialogElement>(null);
  const episodeModal = useRef<HTMLDialogElement>(null);

  const handleUpdateEpisode = () => {
    console.info("TODO: INTEGRATE UPDATE EPISODE");
  };
  const handleUpdateMapping = () => {
    console.info("TODO: INTEGRATE UPDATE MAPPING");
  };

  return (
    <>
      <div key={id} className="group flex flex-col items-center">
        <div className="relative h-[326px] w-[230px] overflow-hidden rounded-md">
          <Image
            loading="eager"
            src={image}
            fill={true}
            alt={title}
            sizes="230px"
            quality={100}
            className="absolute top-0 left-0 size-full object-cover object-center"
          />
          <button
            className="bg-primary/90 invisible absolute top-3 right-3 flex items-center rounded-md text-white group-hover:visible"
            onClick={() => editModal.current?.showModal()}
          >
            <span className="icon-[mdi--dots-horizontal] z-2 size-8"></span>
          </button>
          <h1 className="bg-neutral/80 absolute bottom-0 left-0 z-1 w-full p-3 pb-9 text-white">
            {title}
          </h1>
          <h1 className="text-primary absolute bottom-0 left-0 z-2 p-3 font-semibold">
            {currentProgress} / {totalEpisodes}
            <button
              className="invisible ml-1 group-hover:visible"
              onClick={() => episodeModal.current?.showModal()}
            >
              +
            </button>
          </h1>
          <h1 className="text-primary absolute right-0 bottom-0 z-2 p-3 font-semibold">
            {rating}
          </h1>
        </div>
      </div>

      <Modal
        ref={editModal}
        title={`Update ${title}`}
        saveLabel="Confirm"
        onSave={handleUpdateMapping}
      >
        <div className="flex flex-col gap-2">
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
                className="btn btn-secondary flex items-center"
                target="_blank"
              >
                <span>View</span>
              </Link>
            }
          ></Card>
          <Card title="MyAnimeList">test</Card>
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
    </>
  );
}
