import PropTypes from "prop-types";

const AppPreview = ({ activeApp }) => {
  return (
    <section className="card app-preview">
      <div className="card-header app-preview-header">
        <div>
          <span className="tag">Live preview</span>
          <h2>{activeApp.name}</h2>
        </div>

        <div className="app-links">
          <a href={activeApp.frontendUrl} target="_blank" rel="noreferrer">
            Open standalone
          </a>
          {activeApp.backendUrl ? (
            <a href={activeApp.backendUrl} target="_blank" rel="noreferrer">
              API health
            </a>
          ) : null}
        </div>
      </div>

      <div className="app-preview-frame-shell">
        <iframe
          className="app-preview-frame"
          src={activeApp.frontendUrl}
          title={`${activeApp.name} preview`}
        />
      </div>
    </section>
  );
};

AppPreview.propTypes = {
  activeApp: PropTypes.shape({
    backendUrl: PropTypes.string,
    frontendUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default AppPreview;
