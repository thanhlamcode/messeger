"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        "w-full",
        "bg-sky-500",
        "text-white",
        "font-bold",
        "py-2",
        "mt-4",
        "rounded-md",
        "mb-4",
        "flex",
        "justify-center",
        "rounded-md",
        "px-3",
        "py-2",
        "text-sm",
        "font-semibold",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        disabled && "opacity-50 cursor-default", // Khi button bị vô hiệu hóa
        fullWidth && "w-full", // Khi button có chiều rộng đầy đủ
        secondary ? "text-gray-900" : "", // Kiểm tra trạng thái secondary
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
      )}
    >
      {children}
    </button>
  );
};
export default Button;
