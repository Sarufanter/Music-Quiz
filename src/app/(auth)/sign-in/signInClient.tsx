"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginSchema } from "@/lib/loginSchema";
import { z } from "zod";

export default function SignInClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      loginSchema.parse({ email, password });

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        console.log(res.error)
          if (res.error.includes("Email not verified")) {
            setError("Підтвердіть email перед входом.");
          } else {
            setError("Невірні дані");
          }        
      } else {
        router.push("/");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError("Сталася невідома помилка");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Вхід</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email або Логін"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Увійти
        </button>
        <button
          type="button"
          onClick={() => signIn("google")}
          className="w-full bg-red-600 text-white py-2 rounded mt-2"
        >
          Google
        </button>
      </form>
      <div className="text-center">
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          <Link href="/sign-up">Dont have an account? Sign un</Link>
        </button>
      </div>
    </div>
  );
}
