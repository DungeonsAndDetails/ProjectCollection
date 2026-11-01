import PropTypes from "prop-types";
import { classNamePropType } from "../propTypes";
import "./style.scss";

const Input = ({
  className = "",
  disabled = false,
  id,
  name,
  onChange,
  placeholder,
  type = "text",
  value,
}) => {
  return (
    <input
      className={`pc-input ${className}`.trim()}
      disabled={disabled}
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};

Input.propTypes = {
  className: classNamePropType,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "password", "number"]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Input;
