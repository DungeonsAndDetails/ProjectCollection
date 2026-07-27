import PropTypes from "prop-types";
import { childrenPropType, classNamePropType } from "../propTypes";
import "./style.scss";

const Badge = ({ children, className = "", variant = "neutral" }) => {
  return (
    <span className={`pc-badge pc-badge--${variant} ${className}`.trim()}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: childrenPropType.isRequired,
  className: classNamePropType,
  variant: PropTypes.oneOf(["neutral", "success", "warning", "danger"]),
};

export default Badge;
