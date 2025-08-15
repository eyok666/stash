import clsx from "clsx";
import s from "./Stats.module.scss";
import { type LucideIcon } from "lucide-react";

export type IStatItem = {
  label: string;
  icon?: LucideIcon;
};

interface StatsProps {
  className?: string;
  items: IStatItem[];
}

function StatsItem({ label, icon: Icon }: IStatItem) {
  return (
    <div className={s.stats__item}>
      {Icon && <Icon className={s["stats__item-icon"]} />}
      <span className={s["stats__item-label"]}>{label}</span>
    </div>
  );
}

export default function Stats({ className, items }: StatsProps) {
  if (!items.length) return null;

  return (
    <div className={clsx(s.stats, className)}>
      {items.map((item, i) => {
        const key = `${i}`;
        return <StatsItem key={key} {...item} />;
      })}
    </div>
  );
}
