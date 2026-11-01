import PropTypes from "prop-types";
import { childrenPropType } from "../propTypes";
import "./style.scss";

const PageShell = ({ children, theme }) => {
  return (
    <div
      className={`pc-page-shell ${theme.shellClass}`.trim()}
      data-theme-key={theme.themeKey}
      data-color-mode={theme.colorMode}
      style={theme.cssVars}
    >
      <div className="pc-page-shell-backdrop" />
      <div className="pc-page-shell-frame">{children}</div>
    </div>
  );
};

PageShell.propTypes = {
  children: childrenPropType.isRequired,
  theme: PropTypes.shape({
    colorMode: PropTypes.string.isRequired,
    cssVars: PropTypes.objectOf(PropTypes.string).isRequired,
    shellClass: PropTypes.string.isRequired,
    themeKey: PropTypes.string.isRequired,
  }).isRequired,
};

export default PageShell;
