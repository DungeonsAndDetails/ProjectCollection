import PropTypes from "prop-types";
import { classNamePropType } from "../propTypes";
import "./style.scss";

const Checkbox = ({ checked, className = "", disabled = false, id, label, name, onChange }) => {
  return (
    <label className={`pc-checkbox ${className}`.trim()}>
      <input
        className="pc-checkbox-input"
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label ? <span className="pc-checkbox-label">{label}</span> : null}
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  className: classNamePropType,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
