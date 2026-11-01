import AppHeader from "./index";

const meta = {
  title: "Layout/AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
  args: {
    kicker: "ProjectCollection",
    title: "Portal shell",
  },
};

export default meta;

export const Default = {};

export const WithoutKicker = {
  args: {
    kicker: undefined,
  },
};

export const WithTrailingContent = {
  args: {
    children: <button type="button">Action</button>,
  },
};
