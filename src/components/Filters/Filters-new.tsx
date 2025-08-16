import { useMemo, useState } from "react";
import { Filter, Hash, X } from "lucide-react";
import s from "./Filters-new.module.scss";
import Button from "@components/Button";
import clsx from "clsx";
import Swipeable from "@components/Swipeable";

interface FiltersProps {
  items: string[];
  searchQuery: string;
  selectedHashtags: string[];
  onHashtagToggle: (hashtag: string) => void;
  onClearFilters: () => void;
}

export default function Filters({
  items,
  searchQuery = "",
  selectedHashtags = [],
  onHashtagToggle,
  onClearFilters,
}: FiltersProps) {
  const [showAllHashtags, setShowAllHashtags] = useState(false);

  const hasActiveFilters =
    searchQuery.length > 0 || selectedHashtags.length > 0;
  const displayHashtags = showAllHashtags ? items : items.slice(0, 8);

  const itemsRender = useMemo(() => {
    return displayHashtags.map((hashtag) => {
      const isSelected = selectedHashtags.includes(hashtag);

      return (
        <Button
          key={hashtag}
          className={clsx(
            s.filters__item,
            isSelected ? s["filters__item--active"] : ""
          )}
          onClick={() => onHashtagToggle(hashtag)}
        >
          <span className={s["filters__item-label"]}>{hashtag}</span>
        </Button>
      );
    });
  }, [displayHashtags, onHashtagToggle, selectedHashtags]);

  if (!items.length) return null;

  return (
    <div className={s.filters}>
      <div className={s.filters__header}>
        <div className={s.filters__title}>
          <Hash className={s["filters__title-icon"]} />
          <span className={s["filters__title-label"]}>Фильтр по хештегам</span>
        </div>

        {hasActiveFilters && (
          <Button
            // variant="ghost"
            // size="sm"
            onClick={onClearFilters}
            className={s.filters__clearAll}
          >
            <X className={s["filters__clearAll-icon"]} />
            Сбросить всё
          </Button>
        )}
      </div>

      <div className={s.filters__container}>
        <div
          className={clsx(
            s.filters__grid,
            showAllHashtags ? s["filters__grid--all"] : ""
          )}
        >
          {showAllHashtags ? (
            itemsRender
          ) : (
            <Swipeable direction="x">{itemsRender}</Swipeable>
          )}
        </div>

        {items.length > 8 && (
          <Button
            // variant="outline"
            // size="lg"
            onClick={() => setShowAllHashtags(!showAllHashtags)}
            className={clsx(s.filters__item, s["filters__item--all"])}
          >
            {showAllHashtags ? "Свернуть" : `Ещё ${items.length}`}
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className={s.filters__summary}>
          <Filter className={s["filters__summary-icon"]} />

          <div className={s["filters__summary-container"]}>
            {searchQuery && (
              <span className={s["filters__summary-text"]}>
                Поиск:{" "}
                <span className="text-white">&quot;{searchQuery}&quot;</span>
              </span>
            )}

            {selectedHashtags.length > 0 && (
              <span className={s["filters__summary-text"]}>
                {searchQuery && " • "}
                Хештеги:{" "}
                <span className="text-white">{selectedHashtags.length}</span>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
