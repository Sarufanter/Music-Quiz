import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/prisma";
import { registerShema } from "@/lib/registerSchema";
import {
  generateEmailVerificationToken,
  sendEmailVerificationToken,
} from "@/lib/emailVerification";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = registerShema.safeParse(body);
  if (!parsed.success) {
    const error = parsed.error.format();
    return NextResponse.json(
      { message: "Помилка валідації", error },
      { status: 400 }
    );
  }

  const { email, username, password } = parsed.data;

  const userExists = await db.user.findUnique({ where: { email } });
  if (userExists) {
    return NextResponse.json(
      { message: "Користувач з таким email вже існує" },
      { status: 400 }
    );
  }
  const usernameExists = await db.user.findUnique({ where: { username } });
  if (usernameExists) {
    return NextResponse.json(
      { message: "Користувач з таким username вже існує" },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);

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

  if(error){
    return {
      error: 'Щось пішло не так. Спробуйте увійти ще раз!'
    }
  }
  return NextResponse.json(
    { message: "Користувача створено. Перевірте email для підтвердження." },
    { status: 201 }
  );
}
