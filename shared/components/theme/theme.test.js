import { describe, expect, it } from "vitest";
import { defaultColorMode, defaultThemeKey, resolveThemeState, themes } from "./index";

describe("theme", () => {
  it("exposes both catalog themes", () => {
    expect(Object.keys(themes)).toEqual(expect.arrayContaining(["daylight", "slate"]));
  });

  it("resolves the default theme and color mode when called with no arguments", () => {
    const theme = resolveThemeState();

    expect(theme.themeKey).toBe(defaultThemeKey);
    expect(theme.colorMode).toBe(defaultColorMode);
  });

  it("falls back to the default theme key for an unknown theme", () => {
    const theme = resolveThemeState("not-a-real-theme");

    expect(theme.themeKey).toBe(defaultThemeKey);
  });

  it("falls back to light for any color mode other than dark", () => {
    const theme = resolveThemeState("daylight", "not-a-real-mode");

    expect(theme.colorMode).toBe("light");
  });

  it("resolves dark mode when explicitly requested", () => {
    const theme = resolveThemeState("daylight", "dark");

    expect(theme.colorMode).toBe("dark");
  });

  it("builds a shellClass reflecting the resolved theme and mode", () => {
    const theme = resolveThemeState("slate", "dark");

    expect(theme.shellClass).toBe("theme-slate mode-dark");
  });

  it("converts tokens into kebab-case --pc-theme-* CSS custom properties", () => {
    const theme = resolveThemeState("daylight", "light");

    expect(theme.cssVars["--pc-theme-background"]).toBe(theme.tokens.background);
    expect(theme.cssVars["--pc-theme-button-text"]).toBe(theme.tokens.buttonText);
  });

  it("includes semantic status tokens for both color modes", () => {
    const light = resolveThemeState("daylight", "light");
    const dark = resolveThemeState("daylight", "dark");

    expect(light.cssVars["--pc-theme-danger-bg"]).toBeDefined();
    expect(dark.cssVars["--pc-theme-danger-bg"]).toBeDefined();
    expect(light.cssVars["--pc-theme-danger-bg"]).not.toBe(dark.cssVars["--pc-theme-danger-bg"]);
  });
});
