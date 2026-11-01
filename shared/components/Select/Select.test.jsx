import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Select from "./index";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

describe("Select", () => {
  it("renders an option for every item", () => {
    render(<Select options={options} value="light" onChange={() => {}} />);

    expect(screen.getByRole("option", { name: "Light" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Dark" })).toBeInTheDocument();
  });

  it("reflects the selected value", () => {
    render(<Select options={options} value="dark" onChange={() => {}} />);

    expect(screen.getByRole("combobox")).toHaveValue("dark");
  });

  it("calls onChange with the newly selected value", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Select options={options} value="light" onChange={handleChange} />);

    await user.selectOptions(screen.getByRole("combobox"), "dark");

    expect(handleChange).toHaveBeenCalledWith("dark");
  });

  it("can be disabled", () => {
    render(<Select options={options} value="light" disabled onChange={() => {}} />);

    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("merges a custom className with the base pc-select class", () => {
    render(
      <Select options={options} value="light" className="extra-class" onChange={() => {}} />,
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("pc-select");
    expect(select).toHaveClass("extra-class");
  });
});
