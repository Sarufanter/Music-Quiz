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
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { addFiles, uploadFiles, fileStates, isUploading } = useUploader();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<presetShcemaType>({ resolver: zodResolver(presetShcema) });

  const onSubmit: SubmitHandler<presetShcemaType> = async (data) => {
    console.log("Form data:", data);
    setSuccess("");
    setError("");
    reset();

    try {
  const uploaded = await uploadFiles();
  // If uploadFiles returns void, skip array checks
  // If you expect uploaded files, handle them via fileStates or other state
  // Example: log completed files from fileStates
  const completed = fileStates.filter((f) => f.status === "COMPLETE" && f.url);

  console.log("Готові URL:", completed.map((f) => f.url));

    setSuccess("Форма успішно відправлена!");
    reset();
  } catch (err) {
    console.error(err);
    setError("Помилка при завантаженні файлів або відправці форми.");
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
            // maxFiles={5}
            maxSize={1024 * 1024 * 10} // 10 MB
            accept={
              {
                // accept: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
                // 'application/pdf': [],
                // 'text/plain': ['.txt'],
              }
            }
          />
        
        <div>{error && <Alert message={error} error />}</div>
        <div>{success && <Alert message={success} success />}</div>
        <Button
          className="bg-green-600 "
          type="submit"
          label={isPending ? "Відправляємо дані..." : "Створити вікторину"}
          disabled={isPending}
        />
      </form>
    </div>
  );
}

export default CreatePresetForm;
