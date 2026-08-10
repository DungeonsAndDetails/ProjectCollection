import { useState } from "react";
import { expect, fn, userEvent } from "storybook/test";
import Select from "./index";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    options,
    value: "light",
    onChange: fn(),
  },
};

export default meta;

export const Default = {};

export const Disabled = {
  args: {
    disabled: true,
  },
};

const InteractiveSelect = (args) => {
  const [value, setValue] = useState(args.value);

  return <Select {...args} value={value} onChange={setValue} />;
};

export const Interactive = {
  render: InteractiveSelect,
};

export const SelectInteraction = {
  play: async ({ args, canvas }) => {
    const select = canvas.getByRole("combobox");

    await userEvent.selectOptions(select, "dark");

    await expect(args.onChange).toHaveBeenCalledWith("dark");
  },
};
