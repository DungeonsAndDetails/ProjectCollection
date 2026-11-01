import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    role: { type: String, enum: ['member', 'admin', 'owner'], default: 'member' },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);
