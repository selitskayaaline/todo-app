import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import TaskInput from "./TaskInput.jsx";

describe("TaskInput", () => {
  it("вызывает onSubmit при нажатии Enter", () => {
    const onSubmit = vi.fn(() => true);
    const onCancel = vi.fn();

    render(<TaskInput onSubmit={onSubmit} onCancel={onCancel} />);

    const input = screen.getByRole("textbox", {
      name: "New task title",
    });

    fireEvent.change(input, {
      target: { value: "Купить молоко" },
    });

    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSubmit).toHaveBeenCalledWith("Купить молоко");
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("вызывает onCancel при нажатии Escape", () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    render(<TaskInput onSubmit={onSubmit} onCancel={onCancel} />);

    const input = screen.getByRole("textbox", {
      name: "New task title",
    });

    fireEvent.keyDown(input, { key: "Escape" });

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("удаляет пробелы по краям названия", () => {
    const onSubmit = vi.fn(() => true);
    const onCancel = vi.fn();

    render(<TaskInput onSubmit={onSubmit} onCancel={onCancel} />);

    const input = screen.getByRole("textbox", {
      name: "New task title",
    });

    fireEvent.change(input, {
      target: { value: "  Купить молоко  " },
    });

    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSubmit).toHaveBeenCalledWith("Купить молоко");
  });

  it("не создаёт задачу с пустым названием", () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    render(<TaskInput onSubmit={onSubmit} onCancel={onCancel} />);

    const input = screen.getByRole("textbox", {
      name: "New task title",
    });

    fireEvent.change(input, {
      target: { value: "   " },
    });

    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("не вызывает onSubmit повторно после успешного создания", () => {
    const onSubmit = vi.fn(() => true);
    const onCancel = vi.fn();

    render(<TaskInput onSubmit={onSubmit} onCancel={onCancel} />);

    const input = screen.getByRole("textbox", {
      name: "New task title",
    });

    fireEvent.change(input, {
      target: { value: "Купить молоко" },
    });

    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
