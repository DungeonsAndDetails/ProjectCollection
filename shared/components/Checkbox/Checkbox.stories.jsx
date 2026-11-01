import { useState } from "react";
import { expect, fn, userEvent } from "storybook/test";
import Checkbox from "./index";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "Accept terms",
    checked: false,
    onChange: fn(),
  },
};

export default meta;

export const Default = {};

export const Checked = {
  args: {
    checked: true,
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};

export const WithoutLabel = {
  args: {
    label: undefined,
  },
};

const InteractiveCheckbox = (args) => {
  const [checked, setChecked] = useState(args.checked);

  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

export const Interactive = {
  render: InteractiveCheckbox,
};

export const CheckInteraction = {
  play: async ({ args, canvas }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "Accept terms" });

    await userEvent.click(checkbox);

    await expect(args.onChange).toHaveBeenCalledWith(true);
  },
};
