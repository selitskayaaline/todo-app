import { useRef, useState } from "react";
import styles from "./TaskInput.module.css";

export default function TaskInput({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);
  const isFinishedRef = useRef(false);

  function finishTask(value) {
    if (isFinishedRef.current) {
      return;
    }

    const cleanTitle = value.trim();

    if (!cleanTitle) {
      isFinishedRef.current = true;
      onCancel();
      return;
    }

    const wasCreated = onSubmit(cleanTitle);

    if (wasCreated) {
      isFinishedRef.current = true;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    finishTask(inputRef.current?.value ?? title);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();

      finishTask(event.currentTarget.value);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();

      if (!isFinishedRef.current) {
        isFinishedRef.current = true;
        onCancel();
      }
    }
  }

  return (
    <form className={styles.taskInput} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter task..."
        autoFocus
        maxLength={200}
        aria-label="New task title"
      />
    </form>
  );
}
