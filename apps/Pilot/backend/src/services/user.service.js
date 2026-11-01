import { User } from '../models/User.js';

export const findOrCreateUserFromGoogleProfile = async ({ sub, email, name, picture }) => {
  return User.findOneAndUpdate(
    { googleId: sub },
    { $set: { email, name, picture }, $setOnInsert: { googleId: sub } },
    { new: true, upsert: true },
  );
};

export const findUserById = async (id) => {
  return User.findById(id);
};

export const serializeUser = (user) => ({
  id: user._id.toString(),
  email: user.email,
  name: user.name,
  picture: user.picture,
  role: user.role,
});
