'use server'
import db from "@/lib/prisma";

export const verifyEmail = async (token: string) => {
  const verificationToken = await db.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) return { error: "Verification token does not exist" };

  const isExpired = new Date(verificationToken.expires) < new Date();

  if (isExpired) return { error: "Verification token is expire" };
  
  const getUserByEmail = async (email: string) => {
    const user = await db.user.findUnique({
      where: { email},
    });
    return user;
  };

  const existingUser = await getUserByEmail(verificationToken.email);

  if(!existingUser) return {error: "User does not exist!"}

  await db.user.update({
    where: {id: existingUser.id},
    data: {emailVerified: new Date(), email: verificationToken.email}
  })

  await db.verificationToken.delete({
    where: { id: verificationToken.id },
  });
  
  return { success: "Email verified!"}
};
