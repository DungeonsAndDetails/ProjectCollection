import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { app } from '../app.js';
import { verifyGoogleIdToken } from '../services/googleAuth.service.js';
import { findOrCreateUserFromGoogleProfile, findUserById } from '../services/user.service.js';

// The store would otherwise try to open a real connection to MONGODB_URI on
// import — stub it out so express-session falls back to its in-memory store.
vi.mock('connect-mongo', () => ({ default: { create: vi.fn(() => undefined) } }));

vi.mock('../services/googleAuth.service.js', () => ({ verifyGoogleIdToken: vi.fn() }));

vi.mock('../services/user.service.js', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, findOrCreateUserFromGoogleProfile: vi.fn(), findUserById: vi.fn() };
});

const fakeUser = {
  _id: { toString: () => 'user-123' },
  email: 'pilot@example.com',
  name: 'Pilot Tester',
  picture: 'https://example.com/avatar.png',
  role: 'member',
};

const googlePayload = {
  sub: 'google-sub-123',
  email: fakeUser.email,
  email_verified: true,
  name: fakeUser.name,
  picture: fakeUser.picture,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/health', () => {
  it('reports ok status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe('ok');
  });
});

describe('POST /api/auth/google', () => {
  it('rejects a request with no credential', async () => {
    const response = await request(app).post('/api/auth/google').send({});

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('rejects a credential Google fails to verify', async () => {
    vi.mocked(verifyGoogleIdToken).mockRejectedValueOnce(new Error('bad token'));

    const response = await request(app).post('/api/auth/google').send({ credential: 'garbage' });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('INVALID_GOOGLE_TOKEN');
  });

  it('rejects an unverified Google email', async () => {
    vi.mocked(verifyGoogleIdToken).mockResolvedValueOnce({
      ...googlePayload,
      email_verified: false,
    });

    const response = await request(app).post('/api/auth/google').send({ credential: 'token' });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('GOOGLE_EMAIL_NOT_VERIFIED');
  });

  it('signs the user in and returns their profile on a valid credential', async () => {
    vi.mocked(verifyGoogleIdToken).mockResolvedValueOnce(googlePayload);
    vi.mocked(findOrCreateUserFromGoogleProfile).mockResolvedValueOnce(fakeUser);

    const response = await request(app).post('/api/auth/google').send({ credential: 'token' });

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({
      id: 'user-123',
      email: fakeUser.email,
      name: fakeUser.name,
      picture: fakeUser.picture,
      role: fakeUser.role,
    });
    expect(response.headers['set-cookie']).toBeDefined();
  });
});

describe('GET /api/auth/me', () => {
  it('rejects when there is no session', async () => {
    const response = await request(app).get('/api/auth/me');

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('UNAUTHENTICATED');
  });

  it('returns the signed-in user for an established session', async () => {
    vi.mocked(verifyGoogleIdToken).mockResolvedValueOnce(googlePayload);
    vi.mocked(findOrCreateUserFromGoogleProfile).mockResolvedValueOnce(fakeUser);
    vi.mocked(findUserById).mockResolvedValueOnce(fakeUser);

    const agent = request.agent(app);
    await agent.post('/api/auth/google').send({ credential: 'token' });

    const response = await agent.get('/api/auth/me');

    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe(fakeUser.email);
  });
});

describe('POST /api/auth/logout', () => {
  it('ends the session so a later /me is unauthenticated', async () => {
    vi.mocked(verifyGoogleIdToken).mockResolvedValueOnce(googlePayload);
    vi.mocked(findOrCreateUserFromGoogleProfile).mockResolvedValueOnce(fakeUser);

    const agent = request.agent(app);
    await agent.post('/api/auth/google').send({ credential: 'token' });

    const logoutResponse = await agent.post('/api/auth/logout');
    expect(logoutResponse.status).toBe(200);
    expect(logoutResponse.body.data.success).toBe(true);

    const meResponse = await agent.get('/api/auth/me');
    expect(meResponse.status).toBe(401);
  });
});
