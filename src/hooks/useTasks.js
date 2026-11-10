import { useCallback, useEffect, useState } from "react";
import { loadTasks, saveTasks } from "../utils/storage.js";

function createTaskId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((title) => {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      return false;
    }

    const newTask = {
      id: createTaskId(),
      title: cleanTitle,
      completed: false,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);

    return true;
  }, []);

  const toggleTask = useCallback((taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }, []);

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
}
