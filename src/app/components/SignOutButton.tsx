
"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button onClick={() => signOut()} className="text-sm text-blue-500 underline">
      Вийти
    </button>
  );
}
