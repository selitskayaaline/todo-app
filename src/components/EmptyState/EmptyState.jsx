import styles from "./EmptyState.module.css";

export default function EmptyState({ onCreateTask }) {
  return (
    <section className={styles.emptyState}>
      <img
        className={styles.illustration}
        src={`${import.meta.env.BASE_URL}empty-state.svg`}
        alt="No tasks yet"
      />

      <h2 className={styles.title}>No tasks yet</h2>

      <p className={styles.description}>
        Create your first task and start organizing your day.
      </p>

      <button className={styles.button} type="button" onClick={onCreateTask}>
        Create task
      </button>
    </section>
  );
}
