import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import EmptyState from "./components/EmptyState/EmptyState.jsx";
import styles from "./App.module.css";

export default function App() {
  const [isAddingTask, setIsAddingTask] = useState(false);

  function handleOpenTaskInput() {
    setIsAddingTask(true);
  }

  return (
    <div className={styles.page}>
      <div className={styles.appShell}>
        <Header />

        <main className={styles.main}>
          <EmptyState onCreateTask={handleOpenTaskInput} />

          {isAddingTask && <p>Task input</p>}
        </main>
      </div>
    </div>
  );
}
