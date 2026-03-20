import { TMALSearchResponse } from "@/types/myanimelist";
import fetcher from "@/utils/fetcher";
import { useDebounce } from "@uidotdev/usehooks";
import Image from "next/image";
import { ChangeEvent, Ref, forwardRef, useState } from "react";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

type Props = {
  searchType?: "mal" | "trakt" | "simkl";
  onClose?: () => void;
};

export default forwardRef(function SearchModal(
  { searchType, onClose }: Props,
  ref: Ref<HTMLDialogElement>,
) {
  const [searchValue, setSearchValue] = useState("");
  const search = useDebounce(searchValue, 1000);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getKey: SWRInfiniteKeyLoader = (
    pageIndex,
    previousPageData: TMALSearchResponse,
  ) => {
    if (!search || !searchType) return null;
    if (previousPageData && !previousPageData?.paging?.next) return null;

    const params = new URLSearchParams({
      q: search,
      limit: "10",
      offset: String(pageIndex * 10),
      fields: "start_date",
    });

    return `/api/${searchType}/search-anime?${params.toString()}`;
  };

  const { data } = useSWRInfinite<TMALSearchResponse>(getKey, fetcher);
  const allData = data ? data.flatMap(page => page.data) : [];

  return (
    <dialog
      className="modal modal-bottom sm:modal-middle"
      ref={ref}
      onClose={onClose}
    >
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>

      <div className="modal-box relative max-w-4xl p-0 max-md:h-[85vh] md:mt-[10vh] md:h-[clamp(13rem,80vh,80vh)] md:w-11/12">
        <div
          className="rounded-box h-full overflow-y-auto [scrollbar-width:thin]"
          style={{ scrollPaddingTop: "3.5rem" }}
        >
          <label className="input input-lg lg:input-xl bg-base-100 border-base-300 sticky top-0 z-1 mb-2 w-full rounded-none border-0 border-b shadow-none focus-within:shadow-none focus-within:outline-none lg:px-6">
            <span className="icon-[mdi--search] size-8 opacity-50"></span>
            <input
              type="text"
              autoComplete="off"
              placeholder="Type to search..."
              onChange={onSearchChange}
            />
            <span className="badge badge-xs">
              {allData.length} result{allData.length > 1 ? "s" : ""}
            </span>
          </label>

          <div className="pb-2 lg:pt-2 lg:pb-6">
            <div className="px-2 lg:px-6">
              {allData.map(rec => (
                <option
                  key={rec.node.id}
                  className="has-[a:focus-visible]:bg-neutral rounded-box aria-selected:bg-neutral aria-selected:text-neutral-content flex w-full items-center pe-4"
                >
                  <div className="flex min-w-0 flex-1 cursor-pointer appearance-none items-center py-4 ps-4 focus-visible:outline-none">
                    <div className="shrink-0 ps-3 pe-8 max-lg:hidden">
                      <Image
                        src={rec?.node?.main_picture?.medium || ""}
                        alt={rec?.node?.title || ""}
                        width={48}
                        height={48}
                        className="rounded"
                      />
                    </div>
                    <div className="grid w-full items-center gap-2 md:grid-cols-5">
                      <div className="col-span-2 text-sm">
                        <span className="block">{rec?.node?.title}</span>
                      </div>
                      <div className="col-span-2 truncate pt-1 font-mono text-[0.625rem] tracking-tighter opacity-25 lg:tracking-wide">
                        {rec?.node?.start_date
                          ? new Date(rec.node.start_date).getFullYear()
                          : "Unknown Year"}
                      </div>
                    </div>
                  </div>
                  <div className="ml-2 flex w-13 justify-end gap-1">
                    <button
                      className="btn btn-ghost btn-xs btn-square"
                      title="Add bookmark"
                    >
                      <svg
                        className="size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 18 18"
                      >
                        <path
                          fill="none"
                          d="M8.529,15.222c.297,.155,.644,.155,.941,0,1.57-.819,6.529-3.787,6.529-8.613,.008-2.12-1.704-3.846-3.826-3.859-1.277,.016-2.464,.66-3.173,1.72-.71-1.06-1.897-1.704-3.173-1.72-2.123,.013-3.834,1.739-3.826,3.859,0,4.826,4.959,7.794,6.529,8.613Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        ></path>
                      </svg>
                    </button>
                    <button
                      className="btn btn-ghost btn-xs btn-square"
                      title="Remove from recent"
                    >
                      <svg
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </option>
              ))}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
});
