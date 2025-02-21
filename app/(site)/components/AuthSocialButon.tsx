import clsx from "clsx";
import { IconType } from "react-icons"; // Giả định IconType từ thư viện react-icons

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-flex",
        "w-full",
        "justify-center",
        "rounded-md",
        "bg-white",
        "px-4",
        "py-2",
        "text-gray-500",
        "shadow-sm",
        "ring-1",
        "ring-inset",
        "ring-gray-300",
        "hover:bg-gray-50",
        "focus:outline-offset-0"
      )}
    >
      <Icon /> {/* Giả định icon truyền vào sẽ được hiển thị ở đây */}
    </button>
  );
};

export default AuthSocialButton;
