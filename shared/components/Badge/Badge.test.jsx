import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Badge from "./index";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("defaults to the neutral variant", () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText("New")).toHaveClass("pc-badge--neutral");
  });

  it("allows overriding the variant", () => {
    render(<Badge variant="success">Active</Badge>);

    expect(screen.getByText("Active")).toHaveClass("pc-badge--success");
  });

  it("merges a custom className with the base pc-badge class", () => {
    render(<Badge className="extra-class">New</Badge>);

    const badge = screen.getByText("New");
    expect(badge).toHaveClass("pc-badge");
    expect(badge).toHaveClass("extra-class");
  });
});
