import React from "react";
import db from "@/lib/prisma";
import PlayPreset from "@/app/actions/presets/playPreset";
import DeletePreset from "@/app/actions/presets/deletePreset";

async function PresetForm() {
  // Дістаємо всі пресети
  const presets = await db.songsPreset.findMany({
    include: {
      songs: true, // якщо хочеш одразу бачити пісні
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <h2 className="mt-6 mb-4 text-xl font-bold">Готові Пресети</h2>

      {presets.length === 0 ? (
        <p className="text-gray-500">Ще немає створених вікторин.</p>
      ) : (
        <ul className="space-y-4 pb-4">
          {presets.map((preset) => (
            <li
              key={preset.id}
              className="rounded-lg border p-4 shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <div className="meta mx-4">
                <h3 className="text-lg font-semibold">{preset.title}</h3>
                <p className="text-gray-600">{preset.description}</p>
                <p className="text-sm text-gray-400">
                  {preset.songs.length} пісень
                </p>
              </div>
              <div className="buttons flex justify-between items-center gap-6">
                <DeletePreset id={preset.id} />
                <PlayPreset id={preset.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default PresetForm;
