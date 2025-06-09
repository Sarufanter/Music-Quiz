"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/app/components/FormField";
import Link from "next/link";
import { useState, useTransition } from "react";
import Button from "@/app/components/ui/Button";
import Alert from "@/app/components/ui/Alert";
import { presetShcema, presetShcemaType } from "@/lib/createPresetSchema";
import { MultiFileDropzoneUsage } from "../MultiFileDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { UploadFn } from "../upload/uploader-provider";
import React from "react";
function CreatePresetForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<presetShcemaType>({ resolver: zodResolver(presetShcema) });

  const onSubmit: SubmitHandler<presetShcemaType> = () => {
    setSuccess("");
    setError("");
     const { edgestore } = useEdgeStore();
    
      const uploadFn: UploadFn = React.useCallback(
        async ({ file, onProgressChange, signal }) => {
          const res = await edgestore.publicFiles.upload({
            file,
            signal,
            onProgressChange,
          });
          // you can run some server action or api here
          // to add the necessary data to your database
          console.log(res);
          return res;
        },
        [edgestore],
      );
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
        <MultiFileDropzoneUsage/>
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
