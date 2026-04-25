const learningPrinciples = [
  {
    title: "Learn by shipping",
    copy: "Use the Portal to practice structure, iteration, and delivery instead of treating it like a static demo.",
  },
  {
    title: "Keep ownership clear",
    copy: "Shell concerns belong in Portal, while domain workflows stay inside the product apps that own them.",
  },
  {
    title: "Promote patterns slowly",
    copy: "Move UI or tooling into shared packages only after the pattern proves reusable in real app work.",
  },
];

const LearningPanel = ({ activeApp }) => {
  return (
    <section className="card learning-panel">
      <div className="card-header">
        <span className="tag">Learning code</span>
        <h2>Use {activeApp.name} to study the architecture</h2>
      </div>

      <p className="learning-intro">
        The Portal home page can act as a guided demo surface. Use the compact
        demo switcher in the top nav to swap between apps and compare app
        boundaries, routing ownership, and shell responsibilities.
      </p>

      <div className="learning-demo-card">
        <div className="learning-demo-header">
          <div>
            <span className="tag">Live preview</span>
            <h3>{activeApp.name}</h3>
          </div>
          <div className="app-links">
            <a href={activeApp.frontendUrl} target="_blank" rel="noreferrer">
              Open standalone
            </a>
            <a href={activeApp.backendUrl} target="_blank" rel="noreferrer">
              API health
            </a>
          </div>
        </div>

        <div className="learning-demo-frame-shell">
          <iframe
            className="learning-demo-frame"
            src={activeApp.frontendUrl}
            title={`${activeApp.name} demo preview`}
          />
        </div>
      </div>

      <div className="learning-grid">
        {learningPrinciples.map((item) => (
          <article key={item.title} className="learning-item">
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>

      <ul className="learning-list">
        <li>Start with one clean surface and keep refactors small.</li>
        <li>
          Make the route shell stable before expanding app-specific pages.
        </li>
        <li>
          Use shared components and config intentionally, not automatically.
        </li>
      </ul>
    </section>
  );
};

export default LearningPanel;
