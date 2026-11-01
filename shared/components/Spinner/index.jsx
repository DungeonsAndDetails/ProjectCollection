import PropTypes from "prop-types";
import { classNamePropType } from "../propTypes";
import "./style.scss";

const Spinner = ({ className = "", label = "Loading", size = "md" }) => {
  return (
    <span
      className={`pc-spinner pc-spinner--${size} ${className}`.trim()}
      role="status"
      aria-label={label}
    />
  );
};

Spinner.propTypes = {
  className: classNamePropType,
  label: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Spinner;
