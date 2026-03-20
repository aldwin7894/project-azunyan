type Props = {
  onClick?: () => void;
};

export default function SearchInputButton({ onClick }: Readonly<Props>) {
  return (
    <button
      className="input cursor-pointer focus:outline-none"
      onClick={onClick}
    >
      <span className="icon-[mdi--search] size-8 opacity-50"></span>
      <span className="grow text-left">Search...</span>
      <kbd className="kbd kbd-sm">⌘</kbd>
      <kbd className="kbd kbd-sm">K</kbd>
    </button>
  );
}
