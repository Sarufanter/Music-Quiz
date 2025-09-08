import db from "@/lib/prisma";
import Quiz from "@/app/components/Quiz";
import { notFound } from "next/navigation";

export default async function QuizPage({ params }: { params: { id: string } }) {
  const preset = await db.songsPreset.findUnique({
    where: { id: Number(params.id) },
    include: { songs: true },
  });

  if (!preset) {
    notFound(); // покаже 404
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-2">{preset.title}</h1>
      <p className="text-gray-600 mb-6">{preset.description}</p>
      <Quiz songs={preset.songs} />
    </div>
  );
}
