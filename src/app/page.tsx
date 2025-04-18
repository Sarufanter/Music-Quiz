import { auth } from "@/lib/auth";
import FileUploader from "./components/FileUploader";
import { redirect } from "next/navigation";
import SignOutButton from "./components/SignOutButton";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Музична вікторина — завантаження файлів
      </h1>
      <p>Hello {session.user.name}</p>
      <FileUploader />
      <SignOutButton/>
    </main>
  );
}
