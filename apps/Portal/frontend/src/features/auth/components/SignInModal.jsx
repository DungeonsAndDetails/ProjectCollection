import AuthModalFrame from "./AuthModalFrame";

const SignInModal = ({
  email,
  googleHelperText,
  onClose,
  onEmailChange,
  onGoogleExplore,
  onPasswordChange,
  onSubmit,
  password,
}) => {
  return (
    <AuthModalFrame
      onClose={onClose}
      subtitle="Use a lightweight sign-in flow while Portal auth is still evolving."
      title="Sign in"
    >
      <form className="auth-form" onSubmit={onSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="owner@housing.local"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            placeholder="Enter a placeholder password"
          />
        </label>

        <div className="auth-modal-actions">
          <button type="submit" className="primary-button">
            Unlock Portal
          </button>
        </div>
      </form>

      <div className="auth-provider-panel">
        <div>
          <span className="tag">Google account option</span>
          <p className="auth-provider-copy">
            Gmail-based account management is a strong fit for Portal later via
            Google Identity Services or Firebase Auth.
          </p>
        </div>
        <button
          type="button"
          className="secondary-button"
          onClick={onGoogleExplore}
        >
          Explore Google auth
        </button>
      </div>

      {googleHelperText ? <p className="auth-helper-note">{googleHelperText}</p> : null}
    </AuthModalFrame>
  );
};

export default SignInModal;