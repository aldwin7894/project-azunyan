import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
  actions?: ReactNode;
};

export default function Card({ children, title, actions }: Readonly<Props>) {
  return (
    <div className="card card-bordered card-compact bg-primary  w-full shadow-md">
      <div className="card-body gap-0">
        {title && <h1 className="card-title text-primary-content">{title}</h1>}
        {children}
        {actions && <div className="card-actions justify-end">{actions}</div>}
      </div>
    </div>
  );
}
