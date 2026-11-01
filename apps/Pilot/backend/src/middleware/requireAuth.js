import { asyncHandler } from './asyncHandler.js';
import { ApiError } from './errorHandler.js';
import { findUserById } from '../services/user.service.js';

export const requireAuth = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    next(new ApiError(401, 'UNAUTHENTICATED', 'Not signed in'));
    return;
  }

  // Re-fetched on every request (not cached in the session payload) so a role
  // change or account removal takes effect immediately, not on next login.
  const user = await findUserById(req.session.userId);

  if (!user) {
    next(new ApiError(401, 'UNAUTHENTICATED', 'Session user no longer exists'));
    return;
  }

  req.user = user;
  next();
});
