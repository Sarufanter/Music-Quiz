import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import RegisterForm from "../../components/auth/RegisterForm";

export default async function SignInPage() {
  const session = await auth();
  if (session) redirect("/");
  return <RegisterForm />;
}
