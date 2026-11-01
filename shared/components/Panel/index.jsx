import PropTypes from "prop-types";
import { childrenPropType, classNamePropType } from "../propTypes";
import "./style.scss";

const Panel = ({ actions, children, className = "", tag, title }) => {
  return (
    <section className={`pc-panel ${className}`.trim()}>
      <div className="pc-panel-header">
        <div className="pc-panel-heading">
          {tag ? <span className="pc-panel-tag">{tag}</span> : null}
          <h2 className="pc-panel-title">{title}</h2>
        </div>

        {actions ? <div className="pc-panel-actions">{actions}</div> : null}
      </div>

      <div className="pc-panel-body">{children}</div>
    </section>
  );
};

Panel.propTypes = {
  actions: childrenPropType,
  children: childrenPropType.isRequired,
  className: classNamePropType,
  tag: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Panel;
