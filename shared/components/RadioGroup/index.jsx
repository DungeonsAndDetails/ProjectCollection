import PropTypes from "prop-types";
import { classNamePropType } from "../propTypes";
import "./style.scss";

const RadioGroup = ({ ariaLabel, className = "", name, onChange, options, value }) => {
  return (
    <div className={`pc-radio-group ${className}`.trim()} role="radiogroup" aria-label={ariaLabel}>
      {options.map((option) => (
        <label
          key={option.value}
          className={option.value === value ? "pc-radio-chip active" : "pc-radio-chip"}
        >
          <input
            className="pc-radio-input"
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

RadioGroup.propTypes = {
  ariaLabel: PropTypes.string,
  className: classNamePropType,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
};

export default RadioGroup;
