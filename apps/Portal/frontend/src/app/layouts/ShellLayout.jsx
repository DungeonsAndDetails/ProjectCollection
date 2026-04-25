import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { microfrontends } from "../../features/shell/data/microfrontends";
import { themes } from "../../features/shell/data/themes";

const navigationItems = [
  { to: "/", label: "Home", end: true },
  { to: "/settings", label: "Settings" },
];

const ShellLayout = () => {
  const navigate = useNavigate();
  const [activeAppKey, setActiveAppKey] = useState(microfrontends[0].key);
  const [activeTheme, setActiveTheme] = useState("daylight");
  const theme = themes[activeTheme];
  const activeApp =
    microfrontends.find((app) => app.key === activeAppKey) ?? microfrontends[0];

  const handleAppChange = (appKey) => {
    setActiveAppKey(appKey);
    navigate("/");
  };

  return (
    <div className={`portal-shell ${theme.shellClass}`}>
      <div className="portal-backdrop" />
      <div className="portal-frame">
        <header className="shell-header">
          <div className="shell-header-main">
            <div>
              <p className="shell-kicker">ProjectCollection</p>
              <h1 className="shell-title">Portal shell</h1>
            </div>

            <nav className="shell-nav" aria-label="Portal navigation">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    isActive ? "shell-nav-link active" : "shell-nav-link"
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div
              className="shell-demo-switcher"
              role="tablist"
              aria-label="App demos"
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
                  onClick={() => handleAppChange(app.key)}
                >
                  {app.name}
                </button>
              ))}
            </div>
          </div>
        </header>

        <Outlet
          context={{
            activeApp,
            activeAppKey,
            activeTheme,
            setActiveAppKey,
            setActiveTheme,
            theme,
            themes,
          }}
        />
      </div>
    </div>
  );
};

export default ShellLayout;
