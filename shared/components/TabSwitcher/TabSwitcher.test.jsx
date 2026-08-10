import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TabSwitcher from "./index";

const items = [
  { key: "project1", label: "Project 1" },
  { key: "project2", label: "Project 2" },
];

describe("TabSwitcher", () => {
  it("renders a tab for every item", () => {
    render(<TabSwitcher items={items} activeKey="project1" onChange={() => {}} />);

    expect(screen.getByRole("tab", { name: "Project 1" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Project 2" })).toBeInTheDocument();
  });

  it("marks the active tab as selected", () => {
    render(<TabSwitcher items={items} activeKey="project2" onChange={() => {}} />);

    expect(screen.getByRole("tab", { name: "Project 2" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Project 1" })).toHaveAttribute("aria-selected", "false");
  });

  it("calls onChange with the clicked tab's key", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<TabSwitcher items={items} activeKey="project1" onChange={handleChange} />);

    await user.click(screen.getByRole("tab", { name: "Project 2" }));

    expect(handleChange).toHaveBeenCalledWith("project2");
  });

  it("applies the accessible tablist label when provided", () => {
    render(
      <TabSwitcher
        ariaLabel="App preview switcher"
        items={items}
        activeKey="project1"
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole("tablist", { name: "App preview switcher" })).toBeInTheDocument();
  });

  it("merges a custom className with the base pc-tab-switcher class", () => {
    render(
      <TabSwitcher
        className="extra-class"
        items={items}
        activeKey="project1"
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole("tablist")).toHaveClass("pc-tab-switcher", "extra-class");
  });
});
