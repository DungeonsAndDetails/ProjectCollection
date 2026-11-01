import Card from "./index";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    children: "This is the card body content.",
  },
};

export default meta;

export const Default = {};

export const WithTitle = {
  args: {
    title: "Card title",
  },
};

export const CustomClassName = {
  args: {
    className: "extra-class",
    title: "Styled card",
  },
};
