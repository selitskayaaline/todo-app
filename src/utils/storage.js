const STORAGE_KEY = "todo-app:tasks:v1";

function isValidTask(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    value.id.trim().length > 0 &&
    typeof value.title === "string" &&
    value.title.trim().length > 0 &&
    typeof value.completed === "boolean"
  );
}

export function loadTasks() {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isValidTask).map((task) => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
    }));
  } catch (error) {
    console.warn("Could not load tasks from localStorage.", error);
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn("Could not save tasks to localStorage.", error);
  }
}
