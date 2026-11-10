import styles from "./TaskItem.module.css";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`${styles.item} ${task.completed ? styles.completed : ""}`}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        aria-label={
          task.completed
            ? `Mark “${task.title}” as active`
            : `Mark “${task.title}” as completed`
        }
      />

      <div className={styles.content}>
        <span className={styles.title}>{task.title}</span>
      </div>

      <button
        className={styles.deleteButton}
        type="button"
        onClick={onDelete}
        aria-label={`Delete “${task.title}”`}
        title="Delete task"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m7 7 10 10M17 7 7 17" />
        </svg>
      </button>
    </li>
  );
}
