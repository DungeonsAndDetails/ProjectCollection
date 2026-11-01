import PropTypes from "prop-types";
import { childrenPropType, classNamePropType } from "../propTypes";
import "./style.scss";

const Card = ({ children, className = "", title }) => {
  return (
    <div className={`pc-card ${className}`.trim()}>
      {title ? <h3 className="pc-card-title">{title}</h3> : null}
      <div className="pc-card-body">{children}</div>
    </div>
  );
};

Card.propTypes = {
  children: childrenPropType.isRequired,
  className: classNamePropType,
  title: PropTypes.string,
};

export default Card;
