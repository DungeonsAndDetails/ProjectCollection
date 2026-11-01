import MongoStore from 'connect-mongo';
import session from 'express-session';
import { env } from './env.js';

const fourteenDaysInSeconds = 14 * 24 * 60 * 60;

export const sessionMiddleware = session({
  name: 'pilot.sid',
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: fourteenDaysInSeconds,
  }),
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    // Dev is plain HTTP on localhost; flip to true (and set `app.set('trust proxy', 1)`)
    // once this is served over HTTPS, or the browser will silently drop the cookie.
    secure: false,
    maxAge: fourteenDaysInSeconds * 1000,
  },
});
