import { z } from "zod";

export const PasswordEmailSchema = z.object({
  email: z.string().min(3, {message:"Email або Username обов'язковий"}),
  
});

export type PasswordEmailSchemaType = z.infer<typeof PasswordEmailSchema>