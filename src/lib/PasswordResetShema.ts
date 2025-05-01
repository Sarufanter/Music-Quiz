import { z } from "zod";

export const PasswordResetSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Пароль має бути не менше 6 символів" }),
    confirmPassword: z.string(),
  })
  .refine(
    (val) => {
      return val.password === val.confirmPassword;
    },
    {
      message: "Пароль не співпадає",
      path: ["confirmPassword"],
    }
  );

export type PasswordResetSchemaType = z.infer<typeof PasswordResetSchema>;
