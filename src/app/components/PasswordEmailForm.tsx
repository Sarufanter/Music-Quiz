"use client";

import {
  PasswordEmailSchema,
  PasswordEmailSchemaType,
} from "@/lib/passwordEmailShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "./FormField";
import Alert from "./Alert";
import Button from "./Button";
import { passwordEmail } from "../actions/auth/password-email";

const PasswordEmailForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordEmailSchemaType>({
    resolver: zodResolver(PasswordEmailSchema),
  });

  const onSubmit: SubmitHandler<PasswordEmailSchemaType> = (data) => {
    setError("");
    startTransition(() => {
      passwordEmail(data).then((res) => {
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
      <h1 className="text-2xl font-bold mb-4">Забули пароль ?</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          id="email"
          type="text"
          register={register}
          errors={errors}
          placeholder="Email або ім’я користувача"
          disabled={isPending}
        />

        {error && <Alert message={error} error />}
        {success && <Alert message={success} success />}
        <Button
          className="bg-green-600 "
          type="submit"
          label={isPending ? "Відправляємо дані..." : "Відновити пароль"}
          disabled={isPending}
        />
      </form>
    </div>
  );
};
export default PasswordEmailForm;
