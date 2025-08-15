import s from "./Header.module.scss";

export default function Header() {
  return (
    <header className={s.header}>
      <h1 className={s.header__title}>Stash</h1>
      <p className={s.header__subtitle}>Управление ссылками из чата</p>
    </header>
  );
}
