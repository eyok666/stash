import clsx from "clsx";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import s from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "red" | "green";
}

export default function Button({
  variant,
  className,
  onClick,
  disabled,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(e);
  };

  return (
    <button
      className={clsx(s.button, variant && s[`button--${variant}`], className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
