import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiError } from '../middleware/errorHandler.js';
import { verifyGoogleIdToken } from '../services/googleAuth.service.js';
import { findOrCreateUserFromGoogleProfile, serializeUser } from '../services/user.service.js';
import { googleSignInSchema } from '../validators/auth.validators.js';

const regenerateSession = (req) =>
  new Promise((resolve, reject) => {
    req.session.regenerate((err) => (err ? reject(err) : resolve()));
  });

const saveSession = (req) =>
  new Promise((resolve, reject) => {
    req.session.save((err) => (err ? reject(err) : resolve()));
  });

const destroySession = (req) =>
  new Promise((resolve, reject) => {
    req.session.destroy((err) => (err ? reject(err) : resolve()));
  });

export const googleSignIn = asyncHandler(async (req, res) => {
  const parsed = googleSignInSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new ApiError(
      400,
      'VALIDATION_ERROR',
      parsed.error.issues[0]?.message ?? 'Invalid request body',
    );
  }

  let payload;

  try {
    payload = await verifyGoogleIdToken(parsed.data.credential);
  } catch {
    throw new ApiError(401, 'INVALID_GOOGLE_TOKEN', 'Could not verify Google credential');
  }

  if (!payload.email_verified) {
    throw new ApiError(401, 'GOOGLE_EMAIL_NOT_VERIFIED', "Google account's email is not verified");
  }

  const user = await findOrCreateUserFromGoogleProfile(payload);

  // Regenerate before writing anything new to the session, so a signed-in
  // user can never inherit a pre-login session (session fixation).
  await regenerateSession(req);
  req.session.userId = user._id.toString();
  await saveSession(req);

  res.status(200).json({ data: serializeUser(user) });
});

export const me = asyncHandler(async (req, res) => {
  res.status(200).json({ data: serializeUser(req.user) });
});

export const logout = asyncHandler(async (req, res) => {
  await destroySession(req);
  res.clearCookie('pilot.sid');
  res.status(200).json({ data: { success: true } });
});
