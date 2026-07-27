import { childrenPropType, classNamePropType } from "../propTypes";
import "./style.scss";

const Container = ({ children, className = "" }) => {
  return <div className={`pc-container ${className}`.trim()}>{children}</div>;
};

Container.propTypes = {
  children: childrenPropType.isRequired,
  className: classNamePropType,
};

export default Container;
