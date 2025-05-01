"use server";
import bcrypt from "bcryptjs";
import db from "@/lib/prisma";
import { registerShema, registerShemaType } from "@/lib/registerSchema";
import {
  generateEmailVerificationToken,
  sendEmailVerificationToken,
} from "@/lib/emailVerification";

export const signUp = async (values: registerShemaType) => {

  const validatedCredentials = registerShema.safeParse(values);
  
  if (!validatedCredentials.success) {
    return { error: "Помилка валідації" };
  }

  const { email, username, password } = validatedCredentials.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const userExists = await db.user.findUnique({ where: { email } });
  if (userExists) {
    return {error: "Користувач з таким email вже існує"}
  }

  const usernameExists = await db.user.findUnique({ where: { username } });
  if (usernameExists) {
    return {error: "Користувач з таким username вже існує"}
  }

  await db.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  const emailVerificationToken = await generateEmailVerificationToken(email);
  const { error } = await sendEmailVerificationToken(
    emailVerificationToken.email,
    emailVerificationToken.token
  );

  if (error) {
    return {
      error: "Щось пішло не так. Спробуйте увійти ще раз!",
    };
  }
  return {success: "Користувача створено. Перевірте email для підтвердження."}
};
