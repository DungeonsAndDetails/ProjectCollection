import { useOutletContext } from "react-router-dom";

const SettingsPage = () => {
  const { activeTheme, setActiveTheme, themes } = useOutletContext();

  return (
    <main className="portal-route-layout">
      <section className="card route-card">
        <p className="eyebrow">Shell settings</p>
        <h2>Portal settings</h2>
        <p className="route-copy">
          This is a placeholder route for shell-owned configuration such as
          themes, global navigation preferences, and future access controls.
        </p>

        <div
          className="theme-switcher"
          role="group"
          aria-label="Theme switcher"
        >
          {Object.entries(themes).map(([key, value]) => (
            <button
              key={key}
              type="button"
              className={
                key === activeTheme ? "theme-chip active" : "theme-chip"
              }
              onClick={() => setActiveTheme(key)}
            >
              {value.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SettingsPage;
