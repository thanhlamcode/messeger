import clsx from "clsx";
import {
  FieldError,
  FieldErrorsImpl,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  error?: FieldError | FieldErrorsImpl<any>; // Cập nhật kiểu `error`
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  required,
  register,
  error,
  disabled,
}) => {
  return (
    <div>
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            "form-input",
            "block",
            "w-full",
            "rounded-md",
            "border-0",
            "py-1.5",
            "text-gray-900",
            "shadow-sm",
            "ring-1",
            "ring-inset",
            "ring-gray-300",
            "placeholder:text-gray-400",
            "focus:ring-2",
            "focus:ring-inset",
            "focus:ring-sky-600",
            "sm:text-sm",
            "sm:leading-6",
            error && "focus:ring-rose-500", // Điều kiện nếu có lỗi
            disabled && "opacity-50 cursor-default" // Điều kiện nếu input bị vô hiệu hóa
          )}
        />
        {error && (
          <span className="text-rose-500 text-sm">
            {(error as FieldError)?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
