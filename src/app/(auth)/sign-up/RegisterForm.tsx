"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/app/components/FormField";
import Link from "next/link";
import { registerShema, registerShemaType } from "@/lib/registerSchema";
import { signUp } from "@/app/actions/auth/register";
import { useState, useTransition } from "react";
import Button from "@/app/components/Button";
import Alert from "@/app/components/Alert";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerShemaType>({ resolver: zodResolver(registerShema) });

  const onSubmit: SubmitHandler<registerShemaType> = (data) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      signUp(data).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Реєстрація</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          id="email"
          type="text"
          register={register}
          errors={errors}
          placeholder="Email користувача"
          disabled={isPending}
        />
        <FormField
          id="username"
          type="text"
          register={register}
          errors={errors}
          placeholder="Ім’я користувача"
          disabled={isPending}
        />
        <FormField
          id="password"
          type="password"
          placeholder="Пароль"
          register={register}
          errors={errors}
          disabled={isPending}
        />
        <FormField
          id="confirmPassword"
          type="password"
          placeholder="Підтвердіть пароль"
          register={register}
          errors={errors}
          disabled={isPending}
        />
        <div>{error && <Alert message={error} error />}</div>
        <div>{success && <Alert message={success} success />}</div>
        <Button
          className="bg-green-600 "
          type="submit"
          label={isPending ? "Відправляємо дані..." : "Зареєструватися"}
          disabled={isPending}
        />
      </form>
      <div className="text-center">
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          <Link href="/sign-in">Маєте аккаунт? Увійти</Link>
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
