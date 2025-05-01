"use server";

import db from "@/lib/prisma";
import {
  generateEmailVerificationToken,
  sendEmailVerificationToken,
} from "@/lib/emailVerification";
import { loginSchema, loginSchemaType } from "@/lib/loginSchema";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export const login = async (values: loginSchemaType) => {
  const validatedCredentials = loginSchema.safeParse(values);

  if (!validatedCredentials.success) {
    return { error: "Помилка валідації" };
  }

  const { email, password } = validatedCredentials.data;
  const user = await db.user.findFirst({
    where: {
      OR: [{ email: email }, { username: email }],
    },
  });
  if (!user || !email || !password || !user.password) {
    return { error: "Помилкові дані" };
  }
  if (!user.emailVerified) {
    // const emailVerificationToken = await generateEmailVerificationToken(user.email);
    // const { error } = await sendEmailVerificationToken(
    //   emailVerificationToken.email,
    //   emailVerificationToken.token
    // );

    // if (error) {
    //   return {
    //     error: "Щось пішло не так. Спробуйте увійти ще раз!",
    //   };
    // }

    return {error: "Повідомлення верифікації надіслано. Перевірте пошту!"}
  }
  
  try {
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Щось пішло не так. Спробуйте увійти ще раз!" };
      }
    }
  }
};
