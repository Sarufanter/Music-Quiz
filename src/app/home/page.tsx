import { auth } from "@/lib/auth";
import FileUploader from "@/app/components/FileUploader";
import { redirect } from "next/navigation";
import { MultiFileDropzoneUsage } from "@/app/components/MultiFileDropzone";

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
      <p>Hello {session.user.name || session.user.username}</p>
      <FileUploader />
      <MultiFileDropzoneUsage/>
    </main>
  );
}
