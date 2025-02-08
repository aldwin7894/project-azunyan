import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
};

export default function Card({ children, title }: Readonly<Props>) {
  return (
    <div className="card card-bordered card-compact w-full bg-primary text-primary-content shadow-md">
      <div className="card-body gap-0">
        {title && <h1 className="card-title ">{title}</h1>}
        {children}
      </div>
    </div>
  );
}
