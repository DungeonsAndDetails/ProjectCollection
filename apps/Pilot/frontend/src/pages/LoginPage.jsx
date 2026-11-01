import { Alert, Card, Spinner } from '@projectcollection/component-lib';
import GoogleSignInButton from '../features/auth/components/GoogleSignInButton';
import UserProfileCard from '../features/auth/components/UserProfileCard';
import { useAuthContext } from '../features/auth/hooks/useAuthContext';

const LoginPage = () => {
  const { user, status, error, signInWithGoogleCredential, signOut } = useAuthContext();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-50">
      <section className="mx-auto max-w-md">
        <p className="text-sm font-semibold tracking-[0.3em] text-cyan-300 uppercase">Pilot</p>
        <h1 className="mt-4 mb-8 text-3xl font-semibold tracking-tight text-white">Sign in</h1>

        {status === 'loading' ? <Spinner label="Checking session" /> : null}

        {status === 'authenticated' && user ? (
          <UserProfileCard user={user} onSignOut={signOut} />
        ) : null}

        {status === 'unauthenticated' ? (
          <Card title="Continue with Google">
            {error ? (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            ) : null}
            <GoogleSignInButton onCredential={signInWithGoogleCredential} />
          </Card>
        ) : null}
      </section>
    </main>
  );
};

export default LoginPage;
