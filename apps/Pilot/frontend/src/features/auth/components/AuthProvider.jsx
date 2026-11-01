import { childrenPropType } from '@projectcollection/component-lib';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import { fetchCurrentUser, logout, signInWithGoogle } from '../data/authApi';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurrentUser()
      .then((currentUser) => {
        setUser(currentUser);
        setStatus('authenticated');
      })
      .catch(() => {
        setStatus('unauthenticated');
      });
  }, []);

  const signInWithGoogleCredential = useCallback(async (credential) => {
    setStatus('loading');
    setError(null);

    try {
      const signedInUser = await signInWithGoogle(credential);
      setUser(signedInUser);
      setStatus('authenticated');
    } catch (signInError) {
      setUser(null);
      setStatus('unauthenticated');
      setError(signInError.message);
    }
  }, []);

  const signOut = useCallback(async () => {
    await logout().catch(() => {});
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const value = useMemo(
    () => ({ user, status, error, signInWithGoogleCredential, signOut }),
    [user, status, error, signInWithGoogleCredential, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: childrenPropType.isRequired,
};

export default AuthProvider;
