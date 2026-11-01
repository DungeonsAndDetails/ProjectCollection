import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useGoogleIdentityScript } from '../hooks/useGoogleIdentityScript';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleSignInButton = ({ onCredential }) => {
  const buttonRef = useRef(null);
  const isScriptReady = useGoogleIdentityScript();

  useEffect(() => {
    if (!isScriptReady || !buttonRef.current) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => onCredential(response.credential),
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      width: 320,
    });
  }, [isScriptReady, onCredential]);

  return <div ref={buttonRef} />;
};

GoogleSignInButton.propTypes = {
  onCredential: PropTypes.func.isRequired,
};

export default GoogleSignInButton;
