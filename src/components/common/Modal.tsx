import { ReactNode, Ref, forwardRef } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
  onSave?: () => void;
  saveLabel?: string;
};

export default forwardRef(function Modal(
  { children, title, onSave, saveLabel }: Props,
  ref: Ref<HTMLDialogElement>,
) {
  return (
    <dialog className="modal modal-bottom sm:modal-middle" ref={ref}>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      <div className="modal-box">
        {title && <h3 className="text-lg font-bold">{title}</h3>}
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-4 top-4">
            <span className="icon-[mdi--close] h-6 w-6" />
          </button>
        </form>

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
