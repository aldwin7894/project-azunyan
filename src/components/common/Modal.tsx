import Image from "next/image";
import { ReactNode, Ref, forwardRef } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
  onSave?: () => void;
  saveLabel?: string;
  headerImage?: string;
};

export default forwardRef(function Modal(
  { children, title, onSave, saveLabel, headerImage }: Props,
  ref: Ref<HTMLDialogElement>,
) {
  return (
    <dialog className="modal modal-bottom sm:modal-middle" ref={ref}>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>

      <div className="modal-box relative w-11/12 max-w-5xl">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute top-4 right-4 z-10">
            <span className="icon-[mdi--close] size-6" />
          </button>
        </form>

        {headerImage && (
          <div className="absolute top-0 left-0 h-48 w-full">
            <Image
              loading="lazy"
              src={headerImage}
              alt="Banner"
              quality={100}
              className="-z-10 size-full object-cover object-center opacity-20"
              fill
            />
          </div>
        )}

        {title && <h3 className="text-lg font-bold">{title}</h3>}
        <div className="py-2">{children}</div>

        <form method="dialog" className="modal-action">
          <button className="btn">Close</button>
          {onSave && saveLabel && (
            <button className="btn btn-primary" onClick={onSave}>
              {saveLabel}
            </button>
          )}
        </form>
      </div>
    </dialog>
  );
});
