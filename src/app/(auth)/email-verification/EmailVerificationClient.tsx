"use client";

import { verifyEmail } from "@/app/api/verify-email/route";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

const EmailVerificationClient = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [pending, setPending] = useState(true);
  const router = useRouter()

  useEffect(() => {
    setPending(true);
    if (!token) return;

    verifyEmail(token).then(res => {
      setSuccess(res.success);
      setError(res.error);
    });
    setPending(false);
  }, [token]);

  return (
    <>
      {pending && <div>Verifying Email...</div>}
      {success && <div>Success to verify Email...</div>}
      {error && <div>We get some error to verify Email...</div>}
      {success && <button onClick={()=> router.push('/sign-in')}> Увійти</button>}
    </>
  );
};

export default EmailVerificationClient;
