import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AppHeader from "./index";

describe("AppHeader", () => {
  it("renders the title as a heading", () => {
    render(<AppHeader title="Portal shell" />);

    expect(screen.getByRole("heading", { name: "Portal shell" })).toBeInTheDocument();
  });

  it("renders the kicker when provided", () => {
    render(<AppHeader kicker="ProjectCollection" title="Portal shell" />);

    expect(screen.getByText("ProjectCollection")).toBeInTheDocument();
  });

  it("renders trailing children when provided", () => {
    render(
      <AppHeader title="Portal shell">
        <button type="button">Action</button>
      </AppHeader>,
    );

    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });

  it("does not render a trailing wrapper when no children are provided", () => {
    const { container } = render(<AppHeader title="Portal shell" />);

    expect(container.querySelector(".pc-app-header-trailing")).not.toBeInTheDocument();
  });
});
