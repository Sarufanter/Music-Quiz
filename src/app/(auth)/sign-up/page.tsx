import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignUpClient from "./signUpClient";
import RegisterForm from "./RegisterForm";

export default async function SignInPage() {
  const session = await auth();
  if (session) redirect("/");
  return <RegisterForm />;
}
