import { useEffect, useState } from 'react';

const scriptSrc = 'https://accounts.google.com/gsi/client';

// Google's own script is what defines window.google.accounts.id — loaded once
// and shared, since multiple components may mount/unmount the sign-in button.
export const useGoogleIdentityScript = () => {
  const [ready, setReady] = useState(() => Boolean(window.google?.accounts?.id));

  useEffect(() => {
    if (ready) {
      return undefined;
    }

    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    const script = existingScript ?? document.createElement('script');

    const handleLoad = () => setReady(true);

    script.addEventListener('load', handleLoad);

    if (!existingScript) {
      script.src = scriptSrc;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else if (window.google?.accounts?.id) {
      setReady(true);
    }

    return () => script.removeEventListener('load', handleLoad);
  }, [ready]);

  return ready;
};
