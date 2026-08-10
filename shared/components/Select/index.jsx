import PropTypes from "prop-types";
import { classNamePropType } from "../propTypes";
import "./style.scss";

const Select = ({ className = "", disabled = false, id, name, onChange, options, value }) => {
  return (
    <select
      className={`pc-select ${className}`.trim()}
      disabled={disabled}
      id={id}
      name={name}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  className: classNamePropType,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
};

export default Select;
