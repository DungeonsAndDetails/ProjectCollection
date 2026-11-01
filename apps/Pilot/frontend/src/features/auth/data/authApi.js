const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5100';

const request = async (path, options) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error?.message ?? 'Request failed');
  }

  return body.data;
};

export const signInWithGoogle = (credential) =>
  request('/api/auth/google', { method: 'POST', body: JSON.stringify({ credential }) });

export const fetchCurrentUser = () => request('/api/auth/me', { method: 'GET' });

export const logout = () => request('/api/auth/logout', { method: 'POST' });
