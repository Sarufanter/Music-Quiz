"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/app/components/FormField";
import { useState, useTransition } from "react";
import Button from "@/app/components/ui/Button";
import Alert from "@/app/components/ui/Alert";
import { presetShcema, presetShcemaType } from "@/lib/createPresetSchema";
import { FileUploader } from "../upload/multi-file";
import { useUploader } from "../upload/uploader-provider";
import * as React from "react";

function CreatePresetForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const { uploadFiles, fileStates, isUploading } = useUploader();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<presetShcemaType>({ resolver: zodResolver(presetShcema) });

  const onSubmit: SubmitHandler<presetShcemaType> = async (data) => {
    setSuccess(undefined);
    setError(undefined);

    try {
      // 1. Завантажуємо всі файли
      await uploadFiles();

      // 2. Фільтруємо тільки завершені
      const completed = fileStates.filter(
        (f) => f.status === "COMPLETE" && f.url
      );

      if (completed.length === 0) {
        setError("Не завантажено жодного файлу");
        return;
      }

      // 3. Формуємо масив songs
      const songs = completed.map((f) => ({
        filename: f.file.name,
        composer: "Unknown", // можеш зробити парсінг з назви
        collection: null,
        compositionNumber: null,
        compositionPart: null,
        compositionTheme: null,
        filePath: f.url!, // url з EdgeStore
      }));

      // 4. Відправляємо у бекенд (Prisma)
      const res = await fetch("/api/presets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          songs,
        }),
      });
      console.log(res);
      if (!res.ok) throw new Error("Не вдалось створити вікторину");

      setSuccess("Вікторина успішно створена!");
      reset();
    } catch (err) {
      console.error(err);
      setError("Помилка при завантаженні файлів або збереженні.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Створити вікторину</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          id="title"
          type="text"
          register={register}
          errors={errors}
          placeholder="Назва вікторини"
          disabled={isPending}
        />
        <FormField
          id="description"
          type="text"
          register={register}
          errors={errors}
          placeholder="Опис вікторини"
          disabled={isPending}
        />

        <FileUploader
          maxSize={1024 * 1024 * 10} // 10 MB
          accept={{
            "audio/mpeg": [".mp3"],
            "audio/wav": [".wav"],
            "audio/ogg": [".ogg"],
          }}
        />

        {error && <Alert message={error} error />}
        {success && <Alert message={success} success />}

        <Button
          className="bg-green-600"
          type="submit"
          label={isUploading ? "Завантаження..." : "Створити вікторину"}
          disabled={isUploading || isPending}
        />
      </form>
    </div>
  );
}

export default CreatePresetForm;
