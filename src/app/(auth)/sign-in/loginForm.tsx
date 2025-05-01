"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/lib/loginSchema";
import FormField from "@/app/components/FormField";
import Link from "next/link";
import { useState, useTransition } from "react";
import { login } from "@/app/actions/auth/login";
import Button from "@/app/components/Button";
import Alert from "@/app/components/Alert";
import { useRouter, useSearchParams } from "next/navigation";
import SocialAuth from "./SocialAuth";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) });
  const router = useRouter();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email використовується іншиим способом входу"
      : "";

  const onSubmit: SubmitHandler<loginSchemaType> = (data) => {
    setError("");
    startTransition(() => {
      login(data).then((res) => {
        if (res?.error) {
          router.replace("/sign-in");
          setError(res.error);
        }
        if (!res?.error) {
          router.push("/");
        }

        // if (res?.success) {
        //   setSuccess(res.success);
        // }
      });
    });
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Авторизація</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          id="email"
          type="text"
          register={register}
          errors={errors}
          placeholder="Email або ім’я користувача"
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
        {error && <Alert message={error} error />}
        {success && <Alert message={success} success />}
        <Button
          className="bg-green-600 "
          type="submit"
          label={isPending ? "Відправляємо дані..." : "Увійти"}
          disabled={isPending}
        />
        {urlError && <Alert message={urlError} error />}
        <SocialAuth />
      </form>

      <div className="text-center">
        <button
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          <Link href="/sign-up">Ще немаєте аккаунту? Зареєструватися</Link>
        </button>
        <div className="flex items-end justify-end">
          <Link href="/password-email-form">Забули пароль? Скинути</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
