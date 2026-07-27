import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { microfrontends } from "../../features/shell/data/microfrontends";
import {
  defaultColorMode,
  defaultThemeKey,
  resolveThemeState,
} from "../../features/shell/data/themes";

const colorModeStorageKey = "portal-color-mode";

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

  useEffect(() => {
    window.localStorage.setItem(colorModeStorageKey, colorMode);
  }, [colorMode]);

  const toggleColorMode = () => {
    setColorMode((currentMode) =>
      currentMode === "dark" ? "light" : "dark",
    );
  };

  return (
    <div
      className={`portal-shell ${theme.shellClass}`}
      data-theme-key={theme.themeKey}
      data-color-mode={theme.colorMode}
      style={theme.cssVars}
    >
      <div className="portal-backdrop" />
      <div className="portal-frame">
        <header className="shell-header">
          <div className="shell-header-main">
            <div className="shell-header-leading">
              <button
                type="button"
                className="mode-toggle"
                aria-pressed={colorMode === "dark"}
                onClick={toggleColorMode}
              >
                {colorMode === "dark" ? "Dark mode on" : "Dark mode off"}
              </button>

              <div>
                <p className="shell-kicker">ProjectCollection</p>
                <h1 className="shell-title">Portal shell</h1>
              </div>
            </div>

            <div
              className="shell-demo-switcher"
              role="tablist"
              aria-label="App preview switcher"
            >
              {microfrontends.map((app) => (
                <button
                  key={app.key}
                  type="button"
                  role="tab"
                  aria-selected={app.key === activeApp.key}
                  className={
                    app.key === activeApp.key
                      ? "shell-demo-chip active"
                      : "shell-demo-chip"
                  }
                  onClick={() => setActiveAppKey(app.key)}
                >
                  {app.name}
                </button>
              ))}
            </div>
          </div>
        </header>

        <Outlet context={{ activeApp, theme }} />
      </div>
    </div>
  );
};

export default ShellLayout;
