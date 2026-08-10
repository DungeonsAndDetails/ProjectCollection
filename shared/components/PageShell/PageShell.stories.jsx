import { resolveThemeState } from "../theme";
import PageShell from "./index";

const meta = {
  title: "Layout/PageShell",
  component: PageShell,
  tags: ["autodocs"],
  args: {
    theme: resolveThemeState("daylight", "light"),
    children: (
      <div style={{ padding: 32, color: "var(--pc-theme-text)" }}>
        Page content renders here, inside the themed frame.
      </div>
    ),
  },
};

export default meta;

export const Daylight = {};

export const DaylightDark = {
  args: {
    theme: resolveThemeState("daylight", "dark"),
  },
};

export const Slate = {
  args: {
    theme: resolveThemeState("slate", "light"),
  },
};

export const SlateDark = {
  args: {
    theme: resolveThemeState("slate", "dark"),
  },
};
