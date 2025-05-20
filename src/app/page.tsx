import { auth } from "@/lib/auth";
import FileUploader from "./components/FileUploader";
import { redirect } from "next/navigation";
import SignOutButton from "./components/ui/SignOutButton";
import { MultiFileDropzoneUsage } from "./components/MultiFileDropzone";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="p-6 flex min-h-screen flex-col">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 md:h-40">
        <h1 className="text-2xl text-white font-bold mb-4">Музична вікторина</h1>
      </div>
      <div className="flex  gap-5">
        <Link href="/sign-in">Увійти</Link>
        <Link href="/sign-up">Реєстрація</Link>
      </div>
    </main>
  );
}
