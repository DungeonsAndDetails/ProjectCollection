const AuthModalFrame = ({ children, onClose, subtitle, title }) => {
  return (
    <div className="auth-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="auth-modal-header">
          <div>
            <span className="tag">Portal access</span>
            <h2>{title}</h2>
            <p className="auth-modal-subtitle">{subtitle}</p>
          </div>
          <button type="button" className="auth-modal-close" onClick={onClose}>
            Close
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthModalFrame;