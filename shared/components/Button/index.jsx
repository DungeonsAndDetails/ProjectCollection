import PropTypes from "prop-types";
import { childrenPropType, classNamePropType } from "../propTypes";
import "./style.scss";

const Button = ({ children, className = "", onClick, type = "button" }) => {
  return (
    <button
      className={`pc-button ${className}`.trim()}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: childrenPropType.isRequired,
  className: classNamePropType,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
