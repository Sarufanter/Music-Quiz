// auth.config.ts
import db from "@/lib/prisma";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/loginSchema";
import { generateEmailVerificationToken, sendEmailVerificationToken } from "./lib/emailVerification";

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
        const validatedCredentials = loginSchema.parse(credentials);

        if (!credentials?.email || !credentials?.password) return null;

        const identifier = validatedCredentials.email;

        const user = await db.user.findFirst({
          where: {
            OR: [{ email: identifier }, { username: identifier }],
          },
        });
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        if (!user.emailVerified){
          const emailVerificationToken = await generateEmailVerificationToken(user.email);
        
          const { error } = await sendEmailVerificationToken(
            emailVerificationToken.email,
            emailVerificationToken.token
          );
        
          if (error) {
            throw new Error('Email not verified');
          }
        
          throw new Error('Email not verified');
        }        

        const isValid = await bcrypt.compare(
          validatedCredentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Not valid credentials");
        } else
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            username: user.username,
          };
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
