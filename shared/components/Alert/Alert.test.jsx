import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Alert from "./index";

describe("Alert", () => {
  it("renders its children with an alert role", () => {
    render(<Alert>Something happened</Alert>);

    expect(screen.getByRole("alert")).toHaveTextContent("Something happened");
  });

  it("defaults to the info variant", () => {
    render(<Alert>Something happened</Alert>);

    expect(screen.getByRole("alert")).toHaveClass("pc-alert--info");
  });

  it("allows overriding the variant", () => {
    render(<Alert variant="danger">Something failed</Alert>);

    expect(screen.getByRole("alert")).toHaveClass("pc-alert--danger");
  });

  it("does not render a dismiss button when onDismiss is not provided", () => {
    render(<Alert>Something happened</Alert>);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders a dismiss button and calls onDismiss when clicked", async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();
    render(<Alert onDismiss={handleDismiss}>Something happened</Alert>);

    await user.click(screen.getByRole("button", { name: "Dismiss" }));

    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("merges a custom className with the base pc-alert class", () => {
    render(<Alert className="extra-class">Something happened</Alert>);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("pc-alert");
    expect(alert).toHaveClass("extra-class");
  });
});
