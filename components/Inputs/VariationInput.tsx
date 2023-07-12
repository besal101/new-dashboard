import React, { InputHTMLAttributes } from "react";
import cn from "classnames";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  className?: string;
  label?: string;
  errors: FieldErrors;
  type?: string;
  variant?: "normal";
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
}

const VariationInput: React.FC<InputProps> = ({
  id,
  className,
  label,
  register,
  errors,
  type = "text",
  disabled = false,
  variant = "normal",
  required = false,
}) => {
  const rootClassName = cn(
    {
      "w-full rounded-md border border-white-light bg-white px-4 py-2 text-sm font-semibold text-black !outline-none focus:border-primary focus:ring-transparent dark:border-[#17263c] dark:bg-[#121e32] dark:text-white-dark dark:focus:border-primary":
        variant === "normal",
    },
    className
  );

  const validationRules = required ? { required: "This is required" } : {};

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        disabled={disabled}
        type={type}
        {...register(id, validationRules)}
        className={
          rootClassName + " "
          // (errors[id]
          //   ? "border-rose-500 focus:border-rose-500"
          //   : "border-neutral-300 focus:border-black")
        }
        autoComplete="off"
      />
      {/* {errors[id] && (
        <span className="text-rose-500 text-sm">
          {errors[id]?.message as string}
        </span>
      )} */}
    </div>
  );
};

export default VariationInput;
