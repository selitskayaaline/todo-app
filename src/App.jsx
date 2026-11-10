import { useEffect, useState } from "react";
import Header from "./components/Header/Header.jsx";
import EmptyState from "./components/EmptyState/EmptyState.jsx";
import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import { useTasks } from "./hooks/useTasks.js";
import styles from "./App.module.css";

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [isAddingTask, setIsAddingTask] = useState(false);

  function handleCreateTask(taskTitle) {
    const wasCreated = addTask(taskTitle);

    if (wasCreated) {
      setIsAddingTask(false);
    }

    return wasCreated;
  }

  function handleCancelAdding() {
    setIsAddingTask(false);
  }

  function handleOpenTaskInput() {
    setIsAddingTask(true);
  }

  useEffect(() => {
    function handleGlobalKeyDown(event) {
      if (event.key !== "Enter" || isAddingTask) {
        return;
      }

      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(target.tagName))
      ) {
        return;
      }

      event.preventDefault();
      setIsAddingTask(true);
    }

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [isAddingTask]);

  return (
    <div className={styles.page}>
      <div className={styles.appShell}>
        <Header />

        <main className={styles.main}>
          {tasks.length === 0 && !isAddingTask ? (
            <EmptyState onCreateTask={handleOpenTaskInput} />
          ) : (
            <>
              {!isAddingTask && (
                <button
                  className={styles.addPrompt}
                  type="button"
                  onClick={handleOpenTaskInput}
                >
                  <span className={styles.promptIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
                      <path d="M12 7.5v9M7.5 12h9" />
                    </svg>
                  </span>
                  <span>Tap “Enter” to create task</span>
                </button>
              )}

              {isAddingTask && (
                <TaskInput
                  onSubmit={handleCreateTask}
                  onCancel={handleCancelAdding}
                />
              )}

              <TaskList
                tasks={tasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
