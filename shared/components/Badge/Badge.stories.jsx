import Badge from "./index";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "success", "warning", "danger"],
    },
  },
};

export default meta;

export const Default = {};

export const Success = {
  args: {
    children: "Active",
    variant: "success",
  },
};

export const Warning = {
  args: {
    children: "Pending",
    variant: "warning",
  },
};

export const Danger = {
  args: {
    children: "Failed",
    variant: "danger",
  },
};
