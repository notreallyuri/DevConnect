"use client";
import React, { forwardRef, useState } from "react";
import cn from "@/utils/cn";
import {
  faEye,
  faEyeSlash,
} from "@awesome.me/kit-a322175488/icons/classic/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      error,
      type,
      showPasswordToggle = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setShowPassword((prev) => !prev);
    };

    const inputType =
      type === "password" ? (showPassword ? "text" : "password") : type;

    return (
      <div className={cn("flex w-full flex-col gap-1", className)}>
        {label && (
          <label htmlFor="" className={cn("ml-1 text-lg")}>
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={inputType}
            ref={ref}
            placeholder={placeholder}
            className={cn(
              "h-10 w-full rounded-xl border px-3 outline-none",
              "border-zinc-100/10 bg-white/5",
              error && "border-red-400",
            )}
            {...props}
          />
          {showPasswordToggle && (
            <button
              onClick={handleTogglePassword}
              className={cn(
                "absolute top-1/2 right-4 flex size-5 -translate-y-1/2",
              )}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          )}
        </div>

        {error && <p className={cn("text-error-400 text-xs")}>{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
