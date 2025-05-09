import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(3, {message:"Email або Username обов'язковий"}),
  password: z.string().min(6, { message: "Пароль закороткий" }),
});

export type loginSchemaType = z.infer<typeof loginSchema>