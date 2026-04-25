import { Link, useOutletContext } from "react-router-dom";
import { microfrontends } from "../features/shell/data/microfrontends";

const project1 = microfrontends.find((app) => app.key === "project1");

const Project1Page = () => {
  const { theme } = useOutletContext();

  return (
    <main className="portal-route-layout">
      <section className="card route-card">
        <p className="eyebrow">Hosted workspace</p>
        <h2>Project 1</h2>
        <p className="route-copy">
          This route is the shell-owned entry for Project 1. It can grow into a
          richer launch surface without taking domain behavior away from the app
          itself.
        </p>

        <div className="status-strip route-status-strip">
          <div>
            <span className="status-label">Theme</span>
            <strong>{theme.label}</strong>
          </div>
          <div>
            <span className="status-label">Frontend</span>
            <strong>{project1.frontendUrl}</strong>
          </div>
        </div>

        <div className="app-links">
          <a href={project1.frontendUrl} target="_blank" rel="noreferrer">
            Open Project 1
          </a>
          <a href={project1.backendUrl} target="_blank" rel="noreferrer">
            API health
          </a>
          <Link to="/">Back to home</Link>
        </div>
      </section>
    </main>
  );
};

export default Project1Page;
