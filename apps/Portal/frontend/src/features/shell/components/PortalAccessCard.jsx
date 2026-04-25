const PortalAccessCard = ({
  authNotice,
  displayName,
  email,
  isAuthenticated,
  onOpenSignIn,
  onOpenSignUp,
  onSignOut,
}) => {
  return (
    <div className="card login-card">
      <div className="card-header">
        <span className="tag">Primary access</span>
        <h2>{isAuthenticated ? "Session active" : "Portal sign-in"}</h2>
      </div>

      {isAuthenticated ? (
        <div className="session-state">
          <p>
            Signed in as <strong>{displayName ? `${displayName} · ${email}` : email}</strong>
          </p>
          <button type="button" className="primary-button" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="auth-entry-panel">
          <p className="auth-entry-copy">
            Keep auth entry lightweight for now. Open sign-in or sign-up in a
            dedicated modal so the shell stays readable while account flows evolve.
          </p>

          <div className="auth-entry-actions">
            <button type="button" className="primary-button" onClick={onOpenSignIn}>
              Open sign in
            </button>
            <button type="button" className="secondary-button" onClick={onOpenSignUp}>
              Open sign up
            </button>
          </div>

          <div className="auth-provider-panel inline-panel">
            <div>
              <span className="tag">Google account path</span>
              <p className="auth-provider-copy">
                Portal can later move to Gmail-backed account management for simpler
                identity and recovery flows.
              </p>
            </div>
          </div>

          {authNotice ? <p className="auth-helper-note">{authNotice}</p> : null}
        </div>
      )}
    </div>
  );
};

export default PortalAccessCard;
