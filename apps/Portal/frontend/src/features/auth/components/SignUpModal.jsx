import AuthModalFrame from "./AuthModalFrame";

const SignUpModal = ({
  confirmPassword,
  email,
  googleHelperText,
  name,
  onClose,
  onConfirmPasswordChange,
  onEmailChange,
  onGoogleExplore,
  onNameChange,
  onPasswordChange,
  onSubmit,
  password,
}) => {
  return (
    <AuthModalFrame
      onClose={onClose}
      subtitle="Create a placeholder account flow that can later map to a real provider-backed identity system."
      title="Sign up"
    >
      <form className="auth-form" onSubmit={onSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Portal owner"
          />
        </label>
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
            placeholder="Create a placeholder password"
          />
        </label>
        <label>
          Confirm password
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => onConfirmPasswordChange(event.target.value)}
            placeholder="Confirm the password"
          />
        </label>

        <div className="auth-modal-actions">
          <button type="submit" className="primary-button">
            Create account
          </button>
        </div>
      </form>

      <div className="auth-provider-panel">
        <div>
          <span className="tag">Google account option</span>
          <p className="auth-provider-copy">
            A Gmail-backed account flow can reduce password management later and
            simplify account recovery for real users.
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

export default SignUpModal;