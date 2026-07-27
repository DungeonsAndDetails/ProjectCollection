import Container from "./index";

const meta = {
  title: "Components/Container",
  component: Container,
  tags: ["autodocs"],
  args: {
    children: "Page content lives here, constrained to a readable max width.",
  },
};

export default meta;

export const Default = {};

export const CustomClassName = {
  args: {
    className: "extra-class",
  },
};
