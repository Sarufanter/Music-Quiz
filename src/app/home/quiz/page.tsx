// app/quiz/page.tsx
import PresetForm from "@/app/components/presets/PresetForm";
import { PlusIcon} from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Page() {  

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Вікторини</h1>
      <PresetForm />
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
