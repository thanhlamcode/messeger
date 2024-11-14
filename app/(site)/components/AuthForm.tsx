"use client";

import Input from "@/app/components/input/input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, []);

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
          {variant === "LOGIN" && (
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
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
