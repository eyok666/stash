import type { PropsWithChildren } from "react";
import clsx from "clsx";

import s from "./Badge.module.scss";

interface BadgeProps {
  className?: string;
}

export default function Badge({
  className,
  children,
}: PropsWithChildren<BadgeProps>) {
  return <div className={clsx(s.badge, className)}>{children}</div>;
}
