import {
  AppHeader,
  defaultColorMode,
  defaultThemeKey,
  PageShell,
  RadioGroup,
  resolveThemeState,
  TabSwitcher,
} from "@projectcollection/component-lib";
import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { microfrontends } from "../../features/shell/data/microfrontends";

const colorModeStorageKey = "portal-color-mode";

const colorModeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const readPreference = (storageKey, fallbackValue) => {
  if (typeof window === "undefined") {
    return fallbackValue;
  }

  return window.localStorage.getItem(storageKey) ?? fallbackValue;
};

const ShellLayout = () => {
  const [activeAppKey, setActiveAppKey] = useState(microfrontends[0].key);
  const [colorMode, setColorMode] = useState(() =>
    readPreference(colorModeStorageKey, defaultColorMode),
  );
  const theme = resolveThemeState(defaultThemeKey, colorMode);
  const activeApp =
    microfrontends.find((app) => app.key === activeAppKey) ?? microfrontends[0];
  const tabItems = useMemo(
    () => microfrontends.map((app) => ({ key: app.key, label: app.name })),
    [],
  );

  useEffect(() => {
    window.localStorage.setItem(colorModeStorageKey, colorMode);
  }, [colorMode]);

  return (
    <PageShell theme={theme}>
      <AppHeader kicker="ProjectCollection" title="Portal shell">
        <RadioGroup
          ariaLabel="Color mode"
          name="color-mode"
          onChange={setColorMode}
          options={colorModeOptions}
          value={colorMode}
        />
        <TabSwitcher
          activeKey={activeAppKey}
          ariaLabel="App preview switcher"
          items={tabItems}
          onChange={setActiveAppKey}
        />
      </AppHeader>

      <Outlet context={{ activeApp, theme }} />
    </PageShell>
  );
};

export default ShellLayout;
