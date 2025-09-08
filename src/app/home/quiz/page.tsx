// app/quiz/page.tsx
import db from "@/lib/prisma";
import { PlusIcon, Play } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Page() {
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
              <Link
                href={`/home/quiz/${preset.id}`}
                className="my-auto inline-block text-blue-600 hover:underline mx-8"
              >
                <Play className="inline mr-2" />
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/home/presets/create"
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Створити Presets</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </>
  );
}
