import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Panel from "./index";

describe("Panel", () => {
  it("renders the title as a heading", () => {
    render(<Panel title="Live preview">Body content</Panel>);

    expect(screen.getByRole("heading", { name: "Live preview" })).toBeInTheDocument();
  });

  it("renders its children in the body", () => {
    render(<Panel title="Live preview">Body content</Panel>);

    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("renders a tag when provided", () => {
    render(
      <Panel title="Live preview" tag="Preview">
        Body content
      </Panel>,
    );

    expect(screen.getByText("Preview")).toBeInTheDocument();
  });

  it("omits the tag when none is provided", () => {
    const { container } = render(<Panel title="Live preview">Body content</Panel>);

    expect(container.querySelector(".pc-panel-tag")).not.toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    render(
      <Panel title="Live preview" actions={<button type="button">Open</button>}>
        Body content
      </Panel>,
    );

    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
  });

  it("merges a custom className with the base pc-panel class", () => {
    const { container } = render(
      <Panel title="Live preview" className="extra-class">
        Body content
      </Panel>,
    );

    const panel = container.firstChild;
    expect(panel).toHaveClass("pc-panel");
    expect(panel).toHaveClass("extra-class");
  });
});
