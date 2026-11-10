import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App.jsx";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("показывает пустое состояние при отсутствии задач", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: /create task/i }),
    ).toBeInTheDocument();
  });

  it("создаёт задачу через Enter", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /create task/i }));

    const input = screen.getByRole("textbox", {
      name: "New task title",
    });

    fireEvent.change(input, {
      target: { value: "Купить молоко" },
    });

    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByText("Купить молоко")).toBeInTheDocument();
  });

  it("отменяет создание задачи через Escape", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /create task/i }));

    const input = screen.getByRole("textbox", {
      name: "New task title",
    });

    fireEvent.change(input, {
      target: { value: "Незавершённая задача" },
    });

    fireEvent.keyDown(input, { key: "Escape" });

    expect(screen.queryByText("Незавершённая задача")).not.toBeInTheDocument();

    expect(
      screen.queryByRole("textbox", { name: "New task title" }),
    ).not.toBeInTheDocument();
  });

  it("отмечает задачу выполненной", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /create task/i }));

    const input = screen.getByRole("textbox", {
      name: "New task title",
    });

    fireEvent.change(input, {
      target: { value: "Купить молоко" },
    });

    fireEvent.keyDown(input, { key: "Enter" });

    const checkbox = screen.getByRole("checkbox", {
      name: /mark “купить молоко” as completed/i,
    });

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("удаляет задачу", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /create task/i }));

    const input = screen.getByRole("textbox", {
      name: "New task title",
    });

    fireEvent.change(input, {
      target: { value: "Купить молоко" },
    });

    fireEvent.keyDown(input, { key: "Enter" });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Delete “Купить молоко”",
      }),
    );

    expect(screen.queryByText("Купить молоко")).not.toBeInTheDocument();
  });
});
