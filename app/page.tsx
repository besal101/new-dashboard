"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Inputs/input";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function Signin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.error) {
        toast.error(callback?.error);
      }
      if (callback?.error === null) {
        toast.success("Login Successful");
        router.push("/dashboard");
      }
    });
  };

  return (
    <Container>
      <div className="flex min-h-screen items-center justify-center bg-[url('/images/map.svg')] bg-cover bg-center">
        <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
          <h2 className="mb-3 text-2xl font-bold">Sign In</h2>
          <p className="mb-7">Enter your email and password to login</p>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              label="Email"
              disabled={isLoading}
              register={register}
              errors={errors}
              type="email"
              required
            />
            <Input
              id="password"
              label="Password"
              disabled={isLoading}
              register={register}
              errors={errors}
              type="password"
              required
            />
            <Button className="w-full" variant="primary" loading={isLoading}>
              SIGN IN
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}
