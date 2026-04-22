import React, { useState } from "react";
import { microfrontends } from "./microfrontends";

const themes = {
  daylight: {
    label: "Daylight",
    shellClass: "theme-daylight",
    eyebrow: "Operational clarity",
  },
  slate: {
    label: "Slate",
    shellClass: "theme-slate",
    eyebrow: "Focused command surface",
  },
};

export default function App() {
  const [activeTheme, setActiveTheme] = useState("daylight");
  const [email, setEmail] = useState("owner@housing.local");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleSignIn(event) {
    event.preventDefault();
    if (email.trim() && password.trim()) {
      setIsAuthenticated(true);
    }
  }

  const theme = themes[activeTheme];

  return (
    <div className={`portal-shell ${theme.shellClass}`}>
      <div className="portal-backdrop" />
      <main className="portal-layout">
        <section className="hero-panel">
          <p className="eyebrow">{theme.eyebrow}</p>
          <h1>Housing Portal Shell</h1>
          <p className="lead">
            This primary app owns the entry experience, theme controls, and
            navigation into independently deployed product surfaces.
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

        <section className="control-panel">
          <div className="card login-card">
            <div className="card-header">
              <span className="tag">Primary access</span>
              <h2>{isAuthenticated ? "Session active" : "Portal sign-in"}</h2>
            </div>

            {isAuthenticated ? (
              <div className="session-state">
                <p>
                  Signed in as <strong>{email}</strong>
                </p>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => setIsAuthenticated(false)}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <form className="login-form" onSubmit={handleSignIn}>
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="owner@housing.local"
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter a placeholder password"
                  />
                </label>
                <button type="submit" className="primary-button">
                  Unlock Portal
                </button>
              </form>
            )}
          </div>

          <div className="card app-grid-card">
            <div className="card-header">
              <span className="tag">Micro frontends</span>
              <h2>Connected app surfaces</h2>
            </div>
            <div className="app-grid">
              {microfrontends.map((app) => (
                <article key={app.key} className="app-card">
                  <h3>{app.name}</h3>
                  <p>{app.description}</p>
                  <div className="app-links">
                    <a href={app.frontendUrl} target="_blank" rel="noreferrer">
                      Open frontend
                    </a>
                    <a href={app.backendUrl} target="_blank" rel="noreferrer">
                      Check backend
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
