import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Link from "./index";

describe("Link", () => {
  it("renders its children", () => {
    render(<Link href="/about">About</Link>);

    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  it("renders the href attribute", () => {
    render(<Link href="/about">About</Link>);

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  });

  it("does not set rel by default", () => {
    render(<Link href="/about">About</Link>);

    expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute("rel");
  });

  it("defaults to rel=noreferrer when target=_blank", () => {
    render(
      <Link href="https://example.com" target="_blank">
        Example
      </Link>,
    );

    expect(screen.getByRole("link", { name: "Example" })).toHaveAttribute("rel", "noreferrer");
  });

  it("allows overriding rel even when target=_blank", () => {
    render(
      <Link href="https://example.com" target="_blank" rel="noopener">
        Example
      </Link>,
    );

    expect(screen.getByRole("link", { name: "Example" })).toHaveAttribute("rel", "noopener");
  });

  it("merges a custom className with the base pc-link class", () => {
    render(
      <Link href="/about" className="extra-class">
        About
      </Link>,
    );

    const link = screen.getByRole("link", { name: "About" });
    expect(link).toHaveClass("pc-link");
    expect(link).toHaveClass("extra-class");
  });
});
