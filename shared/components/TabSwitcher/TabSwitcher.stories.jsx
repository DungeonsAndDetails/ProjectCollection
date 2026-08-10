import { useState } from "react";
import { expect, fn, userEvent } from "storybook/test";
import TabSwitcher from "./index";

const items = [
  { key: "project1", label: "Project 1" },
  { key: "project2", label: "Project 2" },
  { key: "components", label: "Components" },
];

const meta = {
  title: "Layout/TabSwitcher",
  component: TabSwitcher,
  tags: ["autodocs"],
  args: {
    items,
    activeKey: "project1",
    onChange: fn(),
  },
};

export default meta;

export const Default = {};

const InteractiveTabSwitcher = (args) => {
  const [activeKey, setActiveKey] = useState(args.activeKey);

  return <TabSwitcher {...args} activeKey={activeKey} onChange={setActiveKey} />;
};

export const Interactive = {
  render: InteractiveTabSwitcher,
};

export const SelectInteraction = {
  play: async ({ args, canvas }) => {
    const tab = canvas.getByRole("tab", { name: "Components" });

    await userEvent.click(tab);

    await expect(args.onChange).toHaveBeenCalledWith("components");
  },
};
