"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/input/input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import AuthSocialButton from "./AuthSocialButon";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, []);

  const socialAction = () => {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    if (variant === "LOGIN") {
      // nextAuth logic for login
    }

    if (variant === "REGISTER") {
      // axios register logic
    }

    const socialAction = (action: String) => {
      // NextAuth Social Sign in
    };
  };

  return (
    <div
      className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
      "
    >
      <div
        className="
          bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form className="space-6-y" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              label="Name"
              id="name"
              type="text" // Sửa thành "text" thay vì "name" cho type
              required
              error={errors.name}
              register={register}
            />
          )}

          <Input
            label="Email"
            id="email"
            type="email"
            required
            error={errors.email}
            register={register}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            required
            error={errors.password}
            register={register}
          />
          <Button disabled={isLoading} fullWidth type="submit">
            {variant === "LOGIN" ? "LOGIN" : "REGISTER"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
          </div>
        </div>

        <div className="relative flex justify-center text-sm mt-4">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
        <div className="mt-6 flex gap-2">
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => {
              socialAction();
            }}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => {
              socialAction();
            }}
          />
        </div>
        <div
          className="
  flex
  gap-2
  justify-center
  text-sm
  mt-6
  px-2
  text-gray-500
"
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Log in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
