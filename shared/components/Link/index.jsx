import PropTypes from "prop-types";
import { childrenPropType, classNamePropType } from "../propTypes";
import "./style.scss";

const Link = ({ children, className = "", href, rel, target }) => {
  const resolvedRel = target === "_blank" ? (rel ?? "noreferrer") : rel;

  return (
    <a
      className={`pc-link ${className}`.trim()}
      href={href}
      rel={resolvedRel}
      target={target}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  children: childrenPropType.isRequired,
  className: classNamePropType,
  href: PropTypes.string.isRequired,
  rel: PropTypes.string,
  target: PropTypes.string,
};

export default Link;
