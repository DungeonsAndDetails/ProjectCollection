import PropTypes from "prop-types";
import { childrenPropType } from "../propTypes";
import "./style.scss";

const AppHeader = ({ children, kicker, title }) => {
  return (
    <header className="pc-app-header">
      <div className="pc-app-header-main">
        <div className="pc-app-header-leading">
          <p className="pc-app-header-kicker">{kicker}</p>
          <h1 className="pc-app-header-title">{title}</h1>
        </div>

        {children ? <div className="pc-app-header-trailing">{children}</div> : null}
      </div>
    </header>
  );
};

AppHeader.propTypes = {
  children: childrenPropType,
  kicker: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default AppHeader;
