"use client";

import Card from "@/components/common/Card";
import Modal from "@/components/common/Modal";
import { TUserSchema } from "@/models/User";
import Image from "next/image";
import { useRef } from "react";

type Props = {
  id: number;
  image: string;
  title: string;
  currentProgress: number;
  totalEpisodes: number;
  rating: number;
  user?: TUserSchema;
};

export default function AnimeEntry({
  id,
  image,
  title,
  currentProgress,
  totalEpisodes,
  rating,
}: Readonly<Props>) {
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
            loading="lazy"
            src={image}
            fill={true}
            alt={title}
            sizes="230px"
            quality={100}
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
          <button
            className="invisible absolute right-3 top-3 flex items-center rounded-md bg-primary/90 text-white group-hover:visible"
            onClick={() => editModal.current?.showModal()}
          >
            <span className="icon-[mdi--dots-horizontal] z-[2] size-8"></span>
          </button>
          <h1 className="absolute bottom-0 left-0 z-[1] w-full bg-neutral/80 p-3 pb-9 text-white">
            {title}
          </h1>
          <h1 className="absolute bottom-0 left-0 z-[2] p-3 font-semibold text-primary">
            {currentProgress} / {totalEpisodes}
            <button
              className="invisible ml-1 group-hover:visible"
              onClick={() => episodeModal.current?.showModal()}
            >
              +
            </button>
          </h1>
          <h1 className="absolute bottom-0 right-0 z-[2] p-3 font-semibold text-primary">
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
          <Card title="AniList">test</Card>
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
