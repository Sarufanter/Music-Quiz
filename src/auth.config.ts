// auth.config.ts
import db from "@/lib/prisma";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/loginSchema";
import {
  generateEmailVerificationToken,
  sendEmailVerificationToken,
} from "./lib/emailVerification";

export const authConfig: NextAuthConfig = {
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const validatedCredentials = loginSchema.safeParse(credentials);

        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;

          const user = await db.user.findFirst({
            where: {
              OR: [{ email: email }, { username: email }],
            },
          });
          if (!user || !user.password || !email || !password) {
            throw new Error("Invalid user");
          }
          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) {
            return {
              id: user.id.toString(),
              email: user.email,
              name: user.name,
              username: user.username,
            };
          }
        }
        return null;
        // if (!user.emailVerified) {
        //   const emailVerificationToken = await generateEmailVerificationToken(
        //     user.email
        //   );

        //   const { error } = await sendEmailVerificationToken(
        //     emailVerificationToken.email,
        //     emailVerificationToken.token
        //   );

        //   if (error) {
        //     throw new Error("Email not verified");
        //   }

        //   throw new Error("Email not verified");
        // }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username; // 👈 якщо TS свариться
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
        session.user.username = (token as any).username; // 👈 тут теж
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
