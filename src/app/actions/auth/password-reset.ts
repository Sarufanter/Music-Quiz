"use server";

import {
  PasswordResetSchema,
  PasswordResetSchemaType,
} from "@/lib/PasswordResetShema";
import { getPasswordResetTokenByToken } from "@/lib/passwordResetToken";
import db from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const passwordReset = async (
  values: PasswordResetSchemaType,
  token?: string | null
) => {
  if (!token) return { error: "Відсутній токен" };

  const validatedFields = PasswordResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Помилковий пароль" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) return { error: "Відсутній токен" };

  const isExpired = new Date(existingToken.expires) < new Date();

  if (isExpired) return { error: "Токен не дійсний" };

  const user = await db.user.findFirst({
    where: { email: existingToken.email },
  });

  if (!user) return { error: "Користувача не знайдено" };

  const { password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  return {success: 'Пароль оновлено'}
};
