import type { ReactNode } from "react";
import { Calendar, MessageSquare } from "lucide-react";

import s from "./Card.module.scss";
import Badge from "@components/Badge";

interface CardProps {
  title: string;
  date: Date;
  desc: string;
  content: ReactNode;
  tags?: string[];
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export default function Card({ title, date, desc, content, tags }: CardProps) {
  return (
    <div className={s.card}>
      <div className={s.card__header}>
        <div className={s.card__info}>
          <h3 className={s.card__title}>{title}</h3>

          <div className={s.card__meta}>
            <div className={s["card__meta-item"]}>
              <Calendar className={s["card__meta-icon"]} />
              <span className={s["card__meta-label"]}>{formatDate(date)}</span>
            </div>

            <div className={s["card__meta-item"]}>
              <MessageSquare className={s["card__meta-icon"]} />
              <span className={s["card__meta-label"]}>{desc}</span>
            </div>
          </div>
        </div>

        <div className={s.card__actions}>
          <div>edit</div>
          <div>link</div>
          <div>delete</div>
        </div>
      </div>

      <div className={s.card__content}>{content}</div>

      {tags && tags.length && (
        <div className={s.card__tags}>
          {tags.map((tag) => {
            return (
              <Badge key={tag} className={s.card__tag}>
                {tag}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
