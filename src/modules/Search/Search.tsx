import clsx from "clsx";
import { Search as SearchIcon, X as ClearIcon } from "lucide-react";

import s from "./Search.module.scss";

interface SearchProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ className, value, onChange }: SearchProps) {
  return (
    <div className={clsx(s.search, className)}>
      <SearchIcon className={clsx(s.search__icon, s.search__action)} />

      <input
        className={s.search__input}
        type="text"
        placeholder="Поиск по ссылкам, описанию или URL..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        title={value}
      />

      {value && (
        <ClearIcon
          className={clsx(s.search__icon, s.search__clear)}
          onClick={() => onChange("")}
        />
      )}
    </div>
  );
}
