import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100),
  displayName: z.string().min(2).max(32),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>; 


