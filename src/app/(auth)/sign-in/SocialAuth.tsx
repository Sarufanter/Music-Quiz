'use client'
import { signIn } from "next-auth/react"
import Button from "@/app/components/Button";
const SocialAuth = () => {
  const handleOnClick = (provider: "google") => {
    signIn(provider, { redirectTo: "/sign-in" });
  };
  return (
    <div>
        <Button  className=" border-4 bg-amber-300"type='button' label="Увійти з Google" onClick={()=> handleOnClick('google')} />
    </div>
  )
};

export default SocialAuth;
