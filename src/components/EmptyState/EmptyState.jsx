import styles from "./EmptyState.module.css";

export default function EmptyState({ onCreateTask }) {
  return (
    <section className={styles.emptyState} aria-labelledby="empty-state-title">
      <img
        className={styles.illustration}
        src={`${import.meta.env.BASE_URL}empty-state.svg`}
        alt="Pink clipboard with an empty task list"
      />

      <p className={styles.message} id="empty-state-title">
        You have no tasks listed.
      </p>

      <button
        className={styles.createButton}
        type="button"
        onClick={onCreateTask}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span>Create task</span>
      </button>
    </section>
  );
}
