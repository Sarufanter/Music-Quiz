import db from "./prisma";
import { v4 as uuid } from "uuid";
import { Resend } from "resend";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (error) {
    console.error(error);
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const emailVerificationToken = await db.verificationToken.create({
    data: { email, token, expires },
  });

  return emailVerificationToken;
};

export const sendEmailVerificationToken = async (
  email: string,
  token: string
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const emailVerificationLink = `${process.env.BASE_URL}/email-verification?token=${token}`;

  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Підтвердження електронної пошти",
    html: `<p>Натисніть <a href="${emailVerificationLink}">сюди</a>, щоб підтвердити пошту</p>`,
  });

  return { error: res.error };
};
