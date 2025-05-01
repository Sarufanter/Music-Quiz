"use client";

import { verifyEmail } from "@/app/actions/auth/verify-email";
import Alert from "@/app/components/Alert";
import Button from "@/app/components/Button";
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
    if (!token) return setError("Missing verification token");

    verifyEmail(token).then(res => {
      setSuccess(res.success);
      setError(res.error);
    });
    setPending(false);
  }, [token]);

  return (
    <>
      {pending && <div>Verifying Email...</div>}
      {success && <Alert message={success} success/>}
      {error && <Alert message={error} error/>}
      {success && <Button className='bg-amber-500'type="submit" label="Увійти" onClick={()=> router.push('/sign-in')}/> }
    </>
  );
};

export default EmailVerificationClient;
