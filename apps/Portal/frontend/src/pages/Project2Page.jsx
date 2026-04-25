import { Link, useOutletContext } from "react-router-dom";
import { microfrontends } from "../features/shell/data/microfrontends";

const project2 = microfrontends.find((app) => app.key === "project2");

const Project2Page = () => {
  const { theme } = useOutletContext();

  return (
    <main className="portal-route-layout">
      <section className="card route-card">
        <p className="eyebrow">Hosted workspace</p>
        <h2>Project 2</h2>
        <p className="route-copy">
          This route is the shell-owned launch point for Project 2. It keeps
          Portal in charge of navigation and discovery while Project 2 stays an
          independent product surface.
        </p>

        <div className="status-strip route-status-strip">
          <div>
            <span className="status-label">Theme</span>
            <strong>{theme.label}</strong>
          </div>
          <div>
            <span className="status-label">Frontend</span>
            <strong>{project2.frontendUrl}</strong>
          </div>
        </div>

        <div className="app-links">
          <a href={project2.frontendUrl} target="_blank" rel="noreferrer">
            Open Project 2
          </a>
          <a href={project2.backendUrl} target="_blank" rel="noreferrer">
            API health
          </a>
          <Link to="/">Back to home</Link>
        </div>
      </section>
    </main>
  );
};

export default Project2Page;
