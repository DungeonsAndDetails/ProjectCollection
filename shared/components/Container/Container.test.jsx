import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Container from "./index";

describe("Container", () => {
  it("renders its children", () => {
    render(<Container>Page content</Container>);

    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("merges a custom className with the base pc-container class", () => {
    const { container } = render(<Container className="extra-class">Content</Container>);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("pc-container");
    expect(wrapper).toHaveClass("extra-class");
  });
});
