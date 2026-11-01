import { useState } from "react";
import { expect, fn, userEvent } from "storybook/test";
import Button from "../Button";
import Modal from "./index";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: {
    title: "Sign in",
    children: "Modal body content goes here.",
    onClose: fn(),
  },
};

export default meta;

export const Default = {};

const ToggleableModal = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      {isOpen ? <Modal {...args} onClose={() => setIsOpen(false)} /> : null}
    </>
  );
};

export const Interactive = {
  render: ToggleableModal,
};

export const CloseInteraction = {
  play: async ({ args, canvas }) => {
    const closeButton = canvas.getByRole("button", { name: "Close" });

    await userEvent.click(closeButton);

    await expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};
