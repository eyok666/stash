import { type ReactNode, useRef, useEffect, forwardRef } from "react";
import clsx from "clsx";

import s from "./Swipeable.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
  direction?: "x" | "y" | "both";
  wheelScroll?: boolean; // включаем поддержку колеса для горизонтали
}

const Swipeable = forwardRef<HTMLDivElement, Props>(
  ({ children, className, direction = "x", wheelScroll = true }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const el = containerRef.current;
      if (!el || !wheelScroll || direction !== "x") return;

      const onWheel = (e: WheelEvent) => {
        // если есть горизонтальный скролл — используем его
        if (el.scrollWidth > el.clientWidth) {
          e.preventDefault();
          el.scrollLeft += e.deltaY; // прокручиваем горизонтально
        }
      };

      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }, [wheelScroll, direction]);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        className={clsx(s.swipeable, className)}
        style={{
          overflowX:
            direction === "x" || direction === "both" ? "auto" : "hidden",
          overflowY:
            direction === "y" || direction === "both" ? "auto" : "hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className={s.swipeableInner}>{children}</div>
      </div>
    );
  }
);

Swipeable.displayName = "Swipeable";

export default Swipeable;
