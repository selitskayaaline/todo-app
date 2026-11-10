import { beforeEach, describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useTasks } from "./useTasks.js";

describe("useTasks", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("начинает с пустого списка задач", () => {
    const { result } = renderHook(() => useTasks());

    expect(result.current.tasks).toEqual([]);
  });

  it("создаёт новую задачу", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask("Купить молоко");
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0]).toMatchObject({
      title: "Купить молоко",
      completed: false,
    });
    expect(result.current.tasks[0].id).toBeTruthy();
  });

  it("не создаёт задачу с пустым названием", () => {
    const { result } = renderHook(() => useTasks());

    let created;

    act(() => {
      created = result.current.addTask("   ");
    });

    expect(created).toBe(false);
    expect(result.current.tasks).toHaveLength(0);
  });

  it("отмечает задачу выполненной и возвращает обратно", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask("Купить молоко");
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.toggleTask(taskId);
    });

    expect(result.current.tasks[0].completed).toBe(true);

    act(() => {
      result.current.toggleTask(taskId);
    });

    expect(result.current.tasks[0].completed).toBe(false);
  });

  it("удаляет задачу", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask("Купить молоко");
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.deleteTask(taskId);
    });

    expect(result.current.tasks).toHaveLength(0);
  });

  it("добавляет новые задачи в начало списка", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask("Первая задача");
      result.current.addTask("Вторая задача");
    });

    expect(result.current.tasks.map((task) => task.title)).toEqual([
      "Вторая задача",
      "Первая задача",
    ]);
  });
});
