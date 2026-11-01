import Spinner from "./index";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

export const Default = {};

export const Small = {
  args: {
    size: "sm",
  },
};

export const Large = {
  args: {
    size: "lg",
  },
};

export const CustomLabel = {
  args: {
    label: "Fetching results",
  },
};
