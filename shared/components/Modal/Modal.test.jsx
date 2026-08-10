import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Modal from "./index";

describe("Modal", () => {
  it("renders the title and children", () => {
    render(
      <Modal title="Sign in" onClose={() => {}}>
        Modal body
      </Modal>,
    );

    expect(screen.getByRole("dialog", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByText("Modal body")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(
      <Modal title="Sign in" onClose={handleClose}>
        Modal body
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    const { container } = render(
      <Modal title="Sign in" onClose={handleClose}>
        Modal body
      </Modal>,
    );

    await user.click(container.querySelector(".pc-modal-backdrop"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking inside the modal content", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(
      <Modal title="Sign in" onClose={handleClose}>
        Modal body
      </Modal>,
    );

    await user.click(screen.getByText("Modal body"));

    expect(handleClose).not.toHaveBeenCalled();
  });

  it("calls onClose when the Escape key is pressed", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(
      <Modal title="Sign in" onClose={handleClose}>
        Modal body
      </Modal>,
    );

    await user.keyboard("{Escape}");

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
