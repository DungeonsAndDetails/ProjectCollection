import { z } from 'zod';

export const googleSignInSchema = z.object({
  credential: z.string().min(1, 'credential is required'),
});
