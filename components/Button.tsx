import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import { ImSpinner2 } from "react-icons/im";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "primary"
    | "primary-outline"
    | "secondary"
    | "secondary-outline"
    | "button-rounded"
    | "button-rounded-active"
    | "button-rounded-disabled";
  loading?: boolean;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  loading = false,
  disabled = false,
  children,
  ...rest
}) => {
  const rootClassName = cn(
    "relative flex items-center justify-center  border  text-sm font-semibold shadow-[0_10px_20px_-10px] outline-none transition duration-300 hover:shadow-none",
    {
      "rounded-md border-primary bg-primary text-white shadow-primary/60 px-5 py-2":
        variant === "primary",
      "rounded-md border-primary text-primary shadow-none hover:bg-primary hover:text-white px-5 py-2":
        variant === "primary-outline",
      "rounded-md border-secondary bg-secondary text-white shadow-secondary/60":
        variant === "secondary",
      "rounded-md border-secondary text-secondary shadow-none hover:bg-secondary hover:text-white px-5 py-2":
        variant === "secondary-outline",
      "cursor-not-allowed hover:cursor-not-allowed bg-opacity-50 hover:bg-opacity-50 px-5 py-2":
        disabled,
      "rounded-full bg-white-light px-3.5 py-2 font-semibold text-dark transition hover:bg-primary hover:text-white dark:bg-[#191e3a] dark:text-white-light dark:hover:bg-primary":
        variant === "button-rounded",
      "rounded-full bg-primary px-3.5 py-2 font-semibold text-white transition dark:bg-primary dark:text-white-light":
        variant === "button-rounded-active",
      "rounded-full bg-white-light p-2 font-semibold text-dark transition hover:bg-primary hover:text-white dark:bg-[#191e3a] dark:text-white-light dark:hover:bg-primary":
        variant === "button-rounded-disabled",
    },
    className
  );

  return (
    <button className={rootClassName} disabled={disabled} {...rest}>
      {children}
      {loading && <ImSpinner2 className="animate-spin -me-1 ms-3 h-5 w-5 " />}
    </button>
  );
};

export default Button;
