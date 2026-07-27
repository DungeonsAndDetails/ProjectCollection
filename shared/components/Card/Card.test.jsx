import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "./index";

describe("Card", () => {
  it("renders its children", () => {
    render(<Card>Card body content</Card>);

    expect(screen.getByText("Card body content")).toBeInTheDocument();
  });

  it("renders a title when provided", () => {
    render(<Card title="Card heading">Body</Card>);

    expect(screen.getByRole("heading", { name: "Card heading" })).toBeInTheDocument();
  });

  it("omits the title heading when none is provided", () => {
    render(<Card>Body</Card>);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("merges a custom className with the base pc-card class", () => {
    const { container } = render(<Card className="extra-class">Body</Card>);

    const card = container.firstChild;
    expect(card).toHaveClass("pc-card");
    expect(card).toHaveClass("extra-class");
  });
});
