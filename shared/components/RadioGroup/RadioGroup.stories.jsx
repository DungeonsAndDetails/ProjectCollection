import { useState } from "react";
import { expect, fn, userEvent } from "storybook/test";
import RadioGroup from "./index";

const modeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    name: "color-mode",
    options: modeOptions,
    value: "light",
    onChange: fn(),
  },
};

export default meta;

export const Default = {};

export const DarkSelected = {
  args: {
    value: "dark",
  },
};

export const ThreeOptions = {
  args: {
    name: "size",
    options: [
      { value: "sm", label: "Small" },
      { value: "md", label: "Medium" },
      { value: "lg", label: "Large" },
    ],
    value: "md",
  },
};

const InteractiveRadioGroup = (args) => {
  const [value, setValue] = useState(args.value);

  return <RadioGroup {...args} value={value} onChange={setValue} />;
};

export const Interactive = {
  render: InteractiveRadioGroup,
};

export const SelectInteraction = {
  play: async ({ args, canvas }) => {
    const darkOption = canvas.getByRole("radio", { name: "Dark" });

    await userEvent.click(darkOption);

    await expect(args.onChange).toHaveBeenCalledWith("dark");
  },
};
