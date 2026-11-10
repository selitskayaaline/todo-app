import { beforeEach, describe, expect, it } from "vitest";
import { loadTasks, saveTasks } from "./storage.js";

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("возвращает пустой массив, если задач нет", () => {
    expect(loadTasks()).toEqual([]);
  });

  it("сохраняет задачи в localStorage", () => {
    const tasks = [
      {
        id: "1",
        title: "Купить молоко",
        completed: false,
      },
    ];

    saveTasks(tasks);

    expect(loadTasks()).toEqual(tasks);
  });

  it("возвращает пустой массив, если данные повреждены", () => {
    localStorage.setItem("todo-app:tasks:v1", "invalid json");

    expect(loadTasks()).toEqual([]);
  });

  it("не загружает задачи с неправильной структурой", () => {
    localStorage.setItem(
      "todo-app:tasks:v1",
      JSON.stringify([
        { id: "1", title: "Корректная задача", completed: false },
        { id: "2", title: "", completed: false },
        { id: "3", title: "Без статуса" },
      ]),
    );

    expect(loadTasks()).toEqual([
      { id: "1", title: "Корректная задача", completed: false },
    ]);
  });
});
