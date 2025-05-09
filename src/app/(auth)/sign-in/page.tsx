import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignInClient from "./signInClient";
import LoginForm from "./loginForm";

export default async function SignInPage() {
  const session = await auth();
  if (session) redirect("/");
  return <LoginForm />;
}
