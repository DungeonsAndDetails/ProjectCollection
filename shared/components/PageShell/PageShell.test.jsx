import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageShell from "./index";

const theme = {
  themeKey: "daylight",
  colorMode: "light",
  shellClass: "theme-daylight mode-light",
  cssVars: {
    "--pc-theme-background": "#f5efe2",
    "--pc-theme-text": "#18242e",
  },
};

describe("PageShell", () => {
  it("renders its children", () => {
    render(<PageShell theme={theme}>Page content</PageShell>);

    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("applies the theme's shellClass, theme-key, and color-mode data attributes", () => {
    const { container } = render(<PageShell theme={theme}>Content</PageShell>);

    const shell = container.firstChild;
    expect(shell).toHaveClass("pc-page-shell", "theme-daylight", "mode-light");
    expect(shell).toHaveAttribute("data-theme-key", "daylight");
    expect(shell).toHaveAttribute("data-color-mode", "light");
  });

  it("applies the theme's cssVars as inline custom properties", () => {
    const { container } = render(<PageShell theme={theme}>Content</PageShell>);

    const shell = container.firstChild;
    expect(shell).toHaveStyle({ "--pc-theme-background": "#f5efe2" });
    expect(shell).toHaveStyle({ "--pc-theme-text": "#18242e" });
  });
});
