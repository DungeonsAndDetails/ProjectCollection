const HeroPanel = ({ activeTheme, onThemeChange, theme, themes }) => {
  return (
    <section className="hero-panel">
      <p className="eyebrow">{theme.eyebrow}</p>
      <h1>Portal Home</h1>
      <p className="lead">
        Portal owns the shell experience for ProjectCollection, including entry
        flow, theme controls, and navigation into independently runnable product
        apps.
      </p>

      <div className="status-strip">
        <div>
          <span className="status-label">Shell</span>
          <strong>Portal frontend on :5172</strong>
        </div>
        <div>
          <span className="status-label">API</span>
          <strong>Portal backend on :4999</strong>
        </div>
      </div>

      <div className="theme-switcher" role="group" aria-label="Theme switcher">
        {Object.entries(themes).map(([key, value]) => (
          <button
            key={key}
            type="button"
            className={key === activeTheme ? "theme-chip active" : "theme-chip"}
            onClick={() => onThemeChange(key)}
          >
            {value.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroPanel;
