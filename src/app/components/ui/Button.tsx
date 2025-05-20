"use client";
import { IconType } from "react-icons";
interface ButtonProps {
  label: string;
  disabled?: boolean;
  outlined?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  label,
  disabled,
  outlined,
  small,
  className,
  type,
  icon: Icon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-white py-2 rounded w-full ${className}`}
    >
      {Icon && <Icon size={20}></Icon>}
      {label}
    </button>
  );
};

export default Button;
