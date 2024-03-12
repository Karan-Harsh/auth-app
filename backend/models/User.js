import { z } from "zod";

export const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const tokenSchema = z.object({
  token: z.string(),
});

export const profilePicUpdateSchema = z.object({
  token: z.string(),
  imageUrl: z.string(),
});
