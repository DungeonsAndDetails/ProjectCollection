import Link from "../Link";
import Panel from "./index";

const meta = {
  title: "Layout/Panel",
  component: Panel,
  tags: ["autodocs"],
  args: {
    title: "Live preview",
    children: "Panel body content goes here.",
  },
};

export default meta;

export const Default = {};

export const WithTag = {
  args: {
    tag: "Preview",
  },
};

export const WithActions = {
  args: {
    tag: "Preview",
    actions: (
      <>
        <Link href="#" variant="button">
          Open standalone
        </Link>
        <Link href="#" variant="button">
          API health
        </Link>
      </>
    ),
  },
};
