"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/input/input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import AuthSocialButton from "./AuthSocialButon";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, []);

  const socialAction = (action: string) => {
    setLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials"); // Hiển thị thông báo lỗi nếu có vấn đề
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!"); // Hiển thị thông báo thành công khi đăng nhập thành công
          router.push("/users");
        }
      })
      .finally(() => setLoading(false)); // Tắt trạng thái loading sau khi hoàn tất
    // NextAuth Social Sign in
  };

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
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials"); // Hiển thị lỗi nếu thông tin đăng nhập không chính xác
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!"); // Hiển thị thông báo thành công khi đăng nhập thành công
          }
        })
        .finally(() => setLoading(false)); // Tắt trạng thái loading sau khi hoàn tất
    }

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .then(() => {
          toast.success("Registration successful!"); // Thông báo thành công khi đăng ký
        })
        .catch(() => {
          toast.error("Something went wrong"); // Thông báo lỗi nếu có vấn đề xảy ra
        })
        .finally(() => {
          setLoading(false); // Đặt trạng thái loading về false sau khi hoàn tất (thành công hoặc thất bại)
        });
    }
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
              type="text"
              required
              error={errors.name}
              register={register}
              disabled={isLoading}
            />
          )}

          <Input
            label="Email"
            id="email"
            type="email"
            required
            error={errors.email}
            register={register}
            disabled={isLoading}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            required
            error={errors.password}
            register={register}
            disabled={isLoading}
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
              socialAction("github");
            }}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => {
              socialAction("google");
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
