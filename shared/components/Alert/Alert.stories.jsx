import { expect, fn, userEvent } from "storybook/test";
import Alert from "./index";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    children: "This is an alert message.",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
  },
};

export default meta;

export const Default = {};

export const Success = {
  args: {
    children: "Your changes have been saved.",
    variant: "success",
  },
};

export const Warning = {
  args: {
    children: "This action cannot be undone.",
    variant: "warning",
  },
};

export const Danger = {
  args: {
    children: "Something went wrong.",
    variant: "danger",
  },
};

export const Dismissible = {
  args: {
    onDismiss: fn(),
  },
};

export const DismissInteraction = {
  args: {
    onDismiss: fn(),
  },
  play: async ({ args, canvas }) => {
    const dismissButton = canvas.getByRole("button", { name: "Dismiss" });

    await userEvent.click(dismissButton);

    await expect(args.onDismiss).toHaveBeenCalledTimes(1);
  },
};
