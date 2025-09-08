import { notFound } from "next/navigation";

export default async function LoadPreset({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/presets/${params.id}`, {
    cache: "no-store", // щоб завжди свіжі дані
  });

  if (!res.ok) return notFound();

  const preset = await res.json();

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">{preset.title}</h1>
      <p className="mb-6 text-gray-600">{preset.description}</p>

      <h2 className="text-xl font-semibold mb-3">Пісні:</h2>
      <ul className="space-y-4">
        {preset.songs.map((song: any) => (
          <li key={song.id} className="border p-3 rounded-lg shadow">
            <p><strong>Композитор:</strong> {song.composer}</p>
            <p><strong>Твір:</strong> {song.collection}</p>
            {song.compositionNumber && <p><strong>Номер:</strong> {song.compositionNumber}</p>}
            {song.compositionPart && <p><strong>Частина:</strong> {song.compositionPart}</p>}
            {song.compositionTheme && <p><strong>Тема:</strong> {song.compositionTheme}</p>}
            <audio controls src={song.filePath} className="mt-2 w-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}
