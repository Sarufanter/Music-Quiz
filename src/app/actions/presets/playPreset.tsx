import { Play } from "lucide-react";
import Link from "next/link";
import React from "react";

type PlayPresetProps = {
  id: number;
};

async function PlayPreset({ id }: PlayPresetProps) {
  return (
    <Link
      href={`/home/quiz/${id}`}
      className="rounded-md p-2 hover:bg-gray-100"
    >
      <Play className="inline hover:text-green-800 text-green-600 cursor-pointer" />
    </Link>
  );
}

export default PlayPreset;

