import PropTypes from "prop-types";
import { classNamePropType } from "../propTypes";
import "./style.scss";

const TabSwitcher = ({ activeKey, ariaLabel, className = "", items, onChange }) => {
  return (
    <div className={`pc-tab-switcher ${className}`.trim()} role="tablist" aria-label={ariaLabel}>
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          role="tab"
          aria-selected={item.key === activeKey}
          className={item.key === activeKey ? "pc-tab-switcher-tab active" : "pc-tab-switcher-tab"}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

TabSwitcher.propTypes = {
  activeKey: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  className: classNamePropType,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TabSwitcher;
