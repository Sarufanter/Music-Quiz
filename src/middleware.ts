import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth:middleware } = NextAuth(authConfig);

export default  middleware((req)=> {

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log("Pathname>>>", nextUrl.pathname, "LoggedIn:", isLoggedIn);

  })   


export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
