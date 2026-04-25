import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import SignInModal from "../features/auth/components/SignInModal";
import SignUpModal from "../features/auth/components/SignUpModal";
import HeroPanel from "../features/shell/components/HeroPanel";
import LearningPanel from "../features/shell/components/LearningPanel";
import PortalAccessCard from "../features/shell/components/PortalAccessCard";

const HomePage = () => {
  const { activeApp, activeTheme, setActiveTheme, theme, themes } =
    useOutletContext();
  const [activeAuthModal, setActiveAuthModal] = useState(null);
  const [authNotice, setAuthNotice] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("owner@housing.local");
  const [password, setPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("owner@housing.local");
  const [signUpName, setSignUpName] = useState("Portal owner");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const closeAuthModal = () => {
    setActiveAuthModal(null);
  };

  const handleGoogleExplore = () => {
    setAuthNotice(
      "Recommended next step: wire Google Identity Services or Firebase Auth when you are ready to support Gmail-backed account management.",
    );
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    if (email.trim() && password.trim()) {
      setDisplayName("");
      setIsAuthenticated(true);
      closeAuthModal();
    }
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    if (
      signUpName.trim() &&
      signUpEmail.trim() &&
      signUpPassword.trim() &&
      signUpPassword === signUpConfirmPassword
    ) {
      setDisplayName(signUpName.trim());
      setEmail(signUpEmail.trim());
      setPassword(signUpPassword);
      setIsAuthenticated(true);
      closeAuthModal();
    }
  };

  return (
    <>
      <main className="portal-layout">
        <HeroPanel
          activeTheme={activeTheme}
          onThemeChange={setActiveTheme}
          theme={theme}
          themes={themes}
        />

        <section className="control-panel">
          <PortalAccessCard
            authNotice={authNotice}
            displayName={displayName}
            email={email}
            isAuthenticated={isAuthenticated}
            onOpenSignIn={() => setActiveAuthModal("sign-in")}
            onOpenSignUp={() => setActiveAuthModal("sign-up")}
            onSignOut={() => setIsAuthenticated(false)}
          />
          <LearningPanel activeApp={activeApp} />
        </section>
      </main>

      {activeAuthModal === "sign-in" ? (
        <SignInModal
          email={email}
          googleHelperText={authNotice}
          onClose={closeAuthModal}
          onEmailChange={setEmail}
          onGoogleExplore={handleGoogleExplore}
          onPasswordChange={setPassword}
          onSubmit={handleSignIn}
          password={password}
        />
      ) : null}

      {activeAuthModal === "sign-up" ? (
        <SignUpModal
          confirmPassword={signUpConfirmPassword}
          email={signUpEmail}
          googleHelperText={authNotice}
          name={signUpName}
          onClose={closeAuthModal}
          onConfirmPasswordChange={setSignUpConfirmPassword}
          onEmailChange={setSignUpEmail}
          onGoogleExplore={handleGoogleExplore}
          onNameChange={setSignUpName}
          onPasswordChange={setSignUpPassword}
          onSubmit={handleSignUp}
          password={signUpPassword}
        />
      ) : null}
    </>
  );
};

export default HomePage;
