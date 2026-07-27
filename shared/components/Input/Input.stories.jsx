import { expect, fn, userEvent } from "storybook/test";
import Input from "./index";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    placeholder: "Type here",
    value: "",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number"],
    },
  },
};

export default meta;

export const Default = {};

export const WithValue = {
  args: {
    value: "Hello world",
  },
};

export const Email = {
  args: {
    type: "email",
    placeholder: "you@example.com",
  },
};

export const Disabled = {
  args: {
    disabled: true,
    value: "Can't touch this",
  },
};

export const TypeInteraction = {
  play: async ({ args, canvas }) => {
    const input = canvas.getByPlaceholderText(args.placeholder);

    await userEvent.type(input, "a");

    await expect(args.onChange).toHaveBeenCalled();
  },
};
