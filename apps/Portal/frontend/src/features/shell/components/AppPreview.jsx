import { Link, Panel } from "@projectcollection/component-lib";
import PropTypes from "prop-types";

const AppPreview = ({ activeApp }) => {
  const actions = (
    <>
      <Link href={activeApp.frontendUrl} target="_blank" variant="button">
        Open standalone
      </Link>
      {activeApp.backendUrl ? (
        <Link href={activeApp.backendUrl} target="_blank" variant="button">
          API health
        </Link>
      ) : null}
    </>
  );

  return (
    <Panel tag="Live preview" title={activeApp.name} actions={actions}>
      <div className="app-preview-frame-shell">
        <iframe
          className="app-preview-frame"
          src={activeApp.frontendUrl}
          title={`${activeApp.name} preview`}
        />
      </div>
    </Panel>
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
