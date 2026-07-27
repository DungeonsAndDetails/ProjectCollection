import { expect, fn, userEvent } from "storybook/test";
import Button from "./index";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Click me",
    onClick: fn(),
  },
  argTypes: {
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
    },
  },
};

export default meta;

export const Default = {};

export const Submit = {
  args: {
    type: "submit",
    children: "Submit",
  },
};

export const CustomClassName = {
  args: {
    className: "extra-class",
  },
};

export const ClickInteraction = {
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button", { name: args.children });

    await userEvent.click(button);

    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
