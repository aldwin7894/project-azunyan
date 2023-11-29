import Link from "next/link";
import ToggleTheme from "../Header/ToggleTheme";
import User from "../Header/User";

export default function Header() {
  return (
    <nav className="navbar sticky inset-x-0 top-0 z-10 flex h-[60px] items-center bg-primary px-4 py-2">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl text-white">
          project-azunyan
        </Link>
      </div>
      <div className="flex flex-none flex-row items-center gap-2">
        <ToggleTheme />
        <User />
      </div>
    </nav>
  );
}
