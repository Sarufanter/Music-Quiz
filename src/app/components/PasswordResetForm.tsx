"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "./FormField";
import Alert from "./Alert";
import Button from "./Button";
import { useSearchParams } from "next/navigation";
import { PasswordResetSchema, PasswordResetSchemaType } from "@/lib/PasswordResetShema";
import { passwordReset } from "../actions/auth/password-reset";

const PasswordResetFormClient = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(PasswordResetSchema),
  });
  const token = searchParams.get('token')
  const onSubmit: SubmitHandler<PasswordResetSchemaType> = (data) => {
    setError("");
    startTransition(() => {
      passwordReset(data,token).then((res) => {
        if (res?.error) {
          setError(res.error);
        }
        if (res?.success) {
          setSuccess(res.success);
        }
      });
    });
  };
  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Введіть новий пароль</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          id="password"
          type="password"
          register={register}
          errors={errors}
          placeholder="Пароль"
          disabled={isPending}
        />
        <FormField
          id="confirmPassword"
          type="password"
          register={register}
          errors={errors}
          placeholder="Повторіть пароль"
          disabled={isPending}
        />

        {error && <Alert message={error} error />}
        {success && <Alert message={success} success />}
        <Button
          className="bg-green-600 "
          type="submit"
          label={isPending ? "Відправляємо дані..." : "Зберегти новий пароль"}
          disabled={isPending}
        />
      </form>
    </div>
  );
};
export default PasswordResetFormClient;
