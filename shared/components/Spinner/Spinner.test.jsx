import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Spinner from "./index";

describe("Spinner", () => {
  it("renders with a status role", () => {
    render(<Spinner />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("defaults to a 'Loading' accessible label", () => {
    render(<Spinner />);

    expect(screen.getByRole("status")).toHaveAccessibleName("Loading");
  });

  it("allows overriding the accessible label", () => {
    render(<Spinner label="Fetching results" />);

    expect(screen.getByRole("status")).toHaveAccessibleName("Fetching results");
  });

  it("defaults to the md size", () => {
    render(<Spinner />);

    expect(screen.getByRole("status")).toHaveClass("pc-spinner--md");
  });

  it("allows overriding the size", () => {
    render(<Spinner size="lg" />);

    expect(screen.getByRole("status")).toHaveClass("pc-spinner--lg");
  });

  it("merges a custom className with the base pc-spinner class", () => {
    render(<Spinner className="extra-class" />);

    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("pc-spinner");
    expect(spinner).toHaveClass("extra-class");
  });
});
