import PropTypes from "prop-types";
import { useEffect } from "react";
import { childrenPropType, classNamePropType } from "../propTypes";
import "./style.scss";

const Modal = ({ children, className = "", onClose, title }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="pc-modal-backdrop" onClick={onClose}>
      <div
        className={`pc-modal ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pc-modal-header">
          <h2 className="pc-modal-title">{title}</h2>
          <button
            type="button"
            className="pc-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="pc-modal-body">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: childrenPropType.isRequired,
  className: classNamePropType,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;
