import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Checkbox from "./index";

describe("Checkbox", () => {
  it("renders with a label", () => {
    render(<Checkbox label="Accept terms" checked={false} onChange={() => {}} />);

    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeInTheDocument();
  });

  it("reflects the checked state", () => {
    render(<Checkbox label="Accept terms" checked onChange={() => {}} />);

    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeChecked();
  });

  it("calls onChange with the new checked value when clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="Accept terms" checked={false} onChange={handleChange} />);

    await user.click(screen.getByRole("checkbox", { name: "Accept terms" }));

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("can be disabled", () => {
    render(<Checkbox label="Accept terms" checked={false} disabled onChange={() => {}} />);

    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeDisabled();
  });

  it("merges a custom className with the base pc-checkbox class", () => {
    const { container } = render(
      <Checkbox className="extra-class" checked={false} onChange={() => {}} />,
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("pc-checkbox");
    expect(wrapper).toHaveClass("extra-class");
  });
});
