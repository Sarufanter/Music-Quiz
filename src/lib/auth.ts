import NextAuth from "next-auth";
import { authConfig } from "@/app/auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);