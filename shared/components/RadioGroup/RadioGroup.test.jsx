import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RadioGroup from "./index";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

describe("RadioGroup", () => {
  it("renders a radio input for every option", () => {
    render(<RadioGroup name="mode" options={options} value="light" onChange={() => {}} />);

    expect(screen.getByRole("radio", { name: "Light" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Dark" })).toBeInTheDocument();
  });

  it("checks the option matching the current value", () => {
    render(<RadioGroup name="mode" options={options} value="dark" onChange={() => {}} />);

    expect(screen.getByRole("radio", { name: "Dark" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Light" })).not.toBeChecked();
  });

  it("calls onChange with the selected value when an option is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<RadioGroup name="mode" options={options} value="light" onChange={handleChange} />);

    await user.click(screen.getByRole("radio", { name: "Dark" }));

    expect(handleChange).toHaveBeenCalledWith("dark");
  });

  it("does not call onChange when clicking the already-selected option", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<RadioGroup name="mode" options={options} value="light" onChange={handleChange} />);

    await user.click(screen.getByRole("radio", { name: "Light" }));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("applies the accessible group label when provided", () => {
    render(
      <RadioGroup
        ariaLabel="Color mode"
        name="mode"
        options={options}
        value="light"
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole("radiogroup", { name: "Color mode" })).toBeInTheDocument();
  });

  it("merges a custom className with the base pc-radio-group class", () => {
    render(
      <RadioGroup
        className="extra-class"
        name="mode"
        options={options}
        value="light"
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole("radiogroup")).toHaveClass("pc-radio-group", "extra-class");
  });
});
