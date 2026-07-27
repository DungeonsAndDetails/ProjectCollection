import PropTypes from "prop-types";
import { childrenPropType, classNamePropType } from "../propTypes";
import "./style.scss";

const Alert = ({ children, className = "", onDismiss, variant = "info" }) => {
  return (
    <div role="alert" className={`pc-alert pc-alert--${variant} ${className}`.trim()}>
      <div className="pc-alert-body">{children}</div>
      {onDismiss ? (
        <button
          type="button"
          className="pc-alert-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          ×
        </button>
      ) : null}
    </div>
  );
};

Alert.propTypes = {
  children: childrenPropType.isRequired,
  className: classNamePropType,
  onDismiss: PropTypes.func,
  variant: PropTypes.oneOf(["info", "success", "warning", "danger"]),
};

export default Alert;
