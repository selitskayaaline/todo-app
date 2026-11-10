import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src={`${import.meta.env.BASE_URL}logo.svg`}
        alt="todo."
      />
    </header>
  );
}
