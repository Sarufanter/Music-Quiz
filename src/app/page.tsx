import FileUploader from "./components/FileUploader";

export default function Home() {
  return (
    <main className="p-6">
    <h1 className="text-2xl font-bold mb-4">Музична вікторина — завантаження файлів</h1>
    <FileUploader />
  </main>
  );
}
