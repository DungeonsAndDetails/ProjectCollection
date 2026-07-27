import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Input from "./index";

describe("Input", () => {
  it("renders with a placeholder", () => {
    render(<Input placeholder="Email address" onChange={() => {}} value="" />);

    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
  });

  it("defaults to type=text", () => {
    render(<Input onChange={() => {}} value="" />);

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });

  it("allows overriding the type", () => {
    render(<Input type="email" onChange={() => {}} value="" />);

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
  });

  it("reflects the value prop", () => {
    render(<Input onChange={() => {}} value="hello" />);

    expect(screen.getByRole("textbox")).toHaveValue("hello");
  });

  it("calls onChange when the user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} value="" />);

    await user.type(screen.getByRole("textbox"), "a");

    expect(handleChange).toHaveBeenCalled();
  });

  it("can be disabled", () => {
    render(<Input disabled onChange={() => {}} value="" />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("merges a custom className with the base pc-input class", () => {
    render(<Input className="extra-class" onChange={() => {}} value="" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("pc-input");
    expect(input).toHaveClass("extra-class");
  });
});
