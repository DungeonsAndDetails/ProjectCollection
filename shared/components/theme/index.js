const defaultThemeKey = "daylight";
const defaultColorMode = "light";

const colorModeLabels = {
  light: "Light",
  dark: "Dark",
};

const statusTokensByMode = {
  light: {
    successBg: "#d4f4dd",
    successText: "#1e6b3a",
    warningBg: "#fdecc8",
    warningText: "#8a5a00",
    dangerBg: "#fbdada",
    dangerText: "#97201f",
    infoBg: "#e3f0fb",
    infoText: "#17466f",
  },
  dark: {
    successBg: "rgba(46, 160, 91, 0.18)",
    successText: "#7ee2a8",
    warningBg: "rgba(241, 179, 92, 0.18)",
    warningText: "#f1b35c",
    dangerBg: "rgba(224, 79, 79, 0.2)",
    dangerText: "#f29a9a",
    infoBg: "rgba(68, 183, 202, 0.18)",
    infoText: "#8fd6e6",
  },
};

const themesCatalog = {
  daylight: {
    label: "Daylight",
    eyebrow: "Operational clarity",
    modes: {
      light: {
        tokens: {
          background: "#f5efe2",
          backgroundAlt: "#dfe9ec",
          backdropHighlight: "rgba(250, 196, 89, 0.45)",
          backdropWash: "rgba(15, 133, 177, 0.35)",
          surface: "rgba(255, 255, 255, 0.62)",
          surfaceAlt: "rgba(255, 255, 255, 0.46)",
          surfaceStrong: "rgba(255, 255, 255, 0.66)",
          border: "rgba(48, 76, 94, 0.12)",
          borderStrong: "rgba(255, 255, 255, 0.55)",
          text: "#18242e",
          muted: "#39505f",
          subtle: "#476272",
          kicker: "#8f5d1e",
          accentStart: "#1f8697",
          accentEnd: "#e9a44e",
          accentSoft: "rgba(17, 34, 51, 0.08)",
          buttonText: "#ffffff",
          inputSurface: "rgba(255, 255, 255, 0.82)",
          inputText: "#18242e",
          inputBorder: "rgba(48, 76, 94, 0.18)",
          shadow: "rgba(39, 53, 66, 0.12)",
          shadowStrong: "rgba(39, 53, 66, 0.18)",
          frame: "#f8fbfc",
          iframeBackground: "#ffffff",
          ...statusTokensByMode.light,
        },
      },
      dark: {
        tokens: {
          background: "#141d26",
          backgroundAlt: "#243545",
          backdropHighlight: "rgba(250, 196, 89, 0.18)",
          backdropWash: "rgba(46, 184, 215, 0.18)",
          surface: "rgba(18, 28, 37, 0.72)",
          surfaceAlt: "rgba(255, 255, 255, 0.06)",
          surfaceStrong: "rgba(18, 28, 37, 0.76)",
          border: "rgba(215, 227, 238, 0.14)",
          borderStrong: "rgba(187, 211, 227, 0.16)",
          text: "#edf4f7",
          muted: "#c3d4df",
          subtle: "#9fb7c6",
          kicker: "#f1b35c",
          accentStart: "#44b7ca",
          accentEnd: "#f1b35c",
          accentSoft: "rgba(255, 255, 255, 0.05)",
          buttonText: "#07131c",
          inputSurface: "rgba(255, 255, 255, 0.06)",
          inputText: "#edf4f7",
          inputBorder: "rgba(215, 227, 238, 0.16)",
          shadow: "rgba(2, 8, 15, 0.28)",
          shadowStrong: "rgba(2, 8, 15, 0.36)",
          frame: "#304556",
          iframeBackground: "#091118",
          ...statusTokensByMode.dark,
        },
      },
    },
  },
  slate: {
    label: "Slate",
    eyebrow: "Focused command surface",
    modes: {
      light: {
        tokens: {
          background: "#e9eff3",
          backgroundAlt: "#d4dee6",
          backdropHighlight: "rgba(76, 183, 210, 0.24)",
          backdropWash: "rgba(255, 171, 92, 0.18)",
          surface: "rgba(244, 248, 251, 0.72)",
          surfaceAlt: "rgba(255, 255, 255, 0.58)",
          surfaceStrong: "rgba(255, 255, 255, 0.82)",
          border: "rgba(54, 73, 89, 0.12)",
          borderStrong: "rgba(255, 255, 255, 0.62)",
          text: "#15212b",
          muted: "#42596a",
          subtle: "#577186",
          kicker: "#1f8697",
          accentStart: "#245c78",
          accentEnd: "#f1b35c",
          accentSoft: "rgba(36, 92, 120, 0.14)",
          buttonText: "#ffffff",
          inputSurface: "rgba(255, 255, 255, 0.88)",
          inputText: "#15212b",
          inputBorder: "rgba(54, 73, 89, 0.16)",
          shadow: "rgba(25, 37, 48, 0.12)",
          shadowStrong: "rgba(25, 37, 48, 0.18)",
          frame: "#f4f7fa",
          iframeBackground: "#ffffff",
          ...statusTokensByMode.light,
        },
      },
      dark: {
        tokens: {
          background: "#131b24",
          backgroundAlt: "#304556",
          backdropHighlight: "rgba(255, 171, 92, 0.18)",
          backdropWash: "rgba(72, 194, 215, 0.18)",
          surface: "rgba(18, 28, 37, 0.72)",
          surfaceAlt: "rgba(255, 255, 255, 0.05)",
          surfaceStrong: "rgba(18, 28, 37, 0.8)",
          border: "rgba(215, 227, 238, 0.14)",
          borderStrong: "rgba(187, 211, 227, 0.16)",
          text: "#edf4f7",
          muted: "#c3d4df",
          subtle: "#9fb7c6",
          kicker: "#f1b35c",
          accentStart: "#1f8697",
          accentEnd: "#e9a44e",
          accentSoft: "rgba(255, 255, 255, 0.05)",
          buttonText: "#07131c",
          inputSurface: "rgba(255, 255, 255, 0.06)",
          inputText: "#edf4f7",
          inputBorder: "rgba(215, 227, 238, 0.16)",
          shadow: "rgba(2, 8, 15, 0.28)",
          shadowStrong: "rgba(2, 8, 15, 0.36)",
          frame: "#304556",
          iframeBackground: "#091118",
          ...statusTokensByMode.dark,
        },
      },
    },
  },
};

const toKebabCase = (value) => value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

export const themes = themesCatalog;
export { defaultColorMode, defaultThemeKey };

export const resolveThemeState = (themeKey = defaultThemeKey, colorMode = defaultColorMode) => {
  const resolvedThemeKey = themesCatalog[themeKey] ? themeKey : defaultThemeKey;
  const resolvedColorMode = colorMode === "dark" ? "dark" : "light";
  const theme = themesCatalog[resolvedThemeKey];
  const tokens = theme.modes[resolvedColorMode].tokens;
  const cssVars = Object.fromEntries(
    Object.entries(tokens).map(([tokenName, tokenValue]) => [
      `--pc-theme-${toKebabCase(tokenName)}`,
      tokenValue,
    ]),
  );

  return {
    themeKey: resolvedThemeKey,
    colorMode: resolvedColorMode,
    colorModeLabel: colorModeLabels[resolvedColorMode],
    label: theme.label,
    eyebrow: theme.eyebrow,
    shellClass: `theme-${resolvedThemeKey} mode-${resolvedColorMode}`,
    tokens,
    cssVars,
  };
};
