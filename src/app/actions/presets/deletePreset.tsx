import db from "@/lib/prisma";
import { Trash } from "lucide-react";
import React from "react";
import { revalidatePath } from "next/cache";

type DeletePresetProps = {
  id: number;
};

// Server action
async function deletePresetAction(formData: FormData) {
  "use server"; 

  const id = Number(formData.get("id"));

  await db.songsPreset.delete({
    where: { id },
  });
    revalidatePath("/home/quiz"); 
}

export default function DeletePreset({ id }: DeletePresetProps) {
  return (
    <form action={deletePresetAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-md p-2 hover:bg-gray-100"
      >
        <Trash className="text-red-600 hover:text-red-800 cursor-pointer" />
      </button>
    </form>
  );
}
