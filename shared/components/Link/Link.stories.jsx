import Link from "./index";

const meta = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    children: "Visit the docs",
    href: "/docs",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "button"],
    },
  },
};

export default meta;

export const Default = {};

export const ExternalLink = {
  args: {
    children: "Open external site",
    href: "https://example.com",
    target: "_blank",
  },
};

export const CustomClassName = {
  args: {
    className: "extra-class",
  },
};

export const ButtonVariant = {
  args: {
    children: "Open standalone",
    variant: "button",
  },
};
