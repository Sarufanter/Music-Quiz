"use server";

import {
  PasswordEmailSchema,
  PasswordEmailSchemaType,
} from "@/lib/passwordEmailShema";
import { generatePasswordResetToken, sendPasswordResetEmail } from "@/lib/passwordResetToken";
import db from "@/lib/prisma";

export const passwordEmail = async (values: PasswordEmailSchemaType) => {
  const validatedFields = PasswordEmailSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Помилковий email або username'}
  }

  const {email} = validatedFields.data;
  const user = await db.user.findFirst({
    where: {
      OR: [{ email: email }, { username: email }],
    },
  });
  if(!user || !user.email || !user.username){
    return {error: 'Помилковий email або username'}
  }

  const passwordResetToken = await generatePasswordResetToken(user.email)

  const {error} = await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

  if(error){
    return {error: "Щось пішло не так із відновленням паролю"}
  }
  return {success: 'Посилання на відновлення паролю надіслано'}
};
