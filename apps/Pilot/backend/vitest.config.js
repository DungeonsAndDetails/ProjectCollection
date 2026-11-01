import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    // Set before any module (incl. config/env.js's zod parse) loads, so tests
    // never need a real Mongo URI or Google client id — those get mocked instead.
    env: {
      PORT: '5100',
      MONGODB_URI: 'mongodb://localhost:27017/pilot-test',
      GOOGLE_CLIENT_ID: 'test-client-id',
      SESSION_SECRET: 'test-session-secret-not-for-real-use-00000000',
      CORS_ORIGIN: 'http://localhost:5173',
    },
  },
});
