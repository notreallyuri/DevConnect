"use client";
import React, { useState, useRef, useEffect } from "react";
import { type Control, type FieldValues, useController } from "react-hook-form";
import cn from "@/utils/cn";
import { faChevronDown } from "@awesome.me/kit-a322175488/icons/classic/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SelectOptions {
  label: string;
  value: string;
}

export interface MultiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  label: string;
  options: SelectOptions[];
  placeholder?: string;
  name: string;
  control?: Control<TFieldValues>;
  defaultValue?: SelectOptions[];
  className?: string;
  error?: string;
}

export interface SelectProps<TFieldValues extends FieldValues = FieldValues> {
  label: string;
  options: SelectOptions[];
  placeholder?: string;
  name: string;
  control?: Control<TFieldValues>;
  defaultValue?: string | null;
  className?: string;
  error?: string;
}

export const Select = ({
  label,
  options,
  placeholder = "Select an option",
  name,
  control,
  defaultValue = null,
  className,
  error,
}: SelectProps) => {
  const { field } = useController({ name, control, defaultValue });
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && e.target instanceof Node) {
        if (!selectRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectOption = (option: SelectOptions) => {
    field.onChange(option.value);
    setIsOpen(false);
  };

  const getButtonText = () => {
    if (!field.value) return placeholder;
    const selectedOption = options.find(
      (option) => option.value === field.value,
    );
    return selectedOption ? selectedOption.label : placeholder;
  };

  return (
    <div className={cn("relative w-full", className)} ref={selectRef}>
      <h2 className="text-white">{label}</h2>
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between px-4 py-2 text-left",
          "border border-zinc-100/20 bg-white/10 hover:border-zinc-50/20",
          "rounded-xl outline-none focus:border-blue-400/40",
          error && "border-error-400",
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        {...field}
        value={undefined}
        onChange={undefined}
      >
        <span>{getButtonText()}</span>
        <span className="pointer-events-none ml-2">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </button>
      {isOpen && (
        <div
          className={cn(
            "rounded-mg absolute z-10 mt-1 w-full overflow-auto border",
            "max-h-60 rounded-lg border-zinc-200/10 bg-zinc-800 shadow-lg",
          )}
        >
          <ul className="py-1">
            {options.map((option) => {
              const isSelected = field.value === option.value;
              return (
                <li
                  key={option.value}
                  onClick={() => selectOption(option)}
                  className={`flex cursor-pointer items-center px-3 py-2 hover:bg-blue-100/20 ${isSelected ? "bg-blue-50/20" : ""}`}
                >
                  <span className="ml-2">{option.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && <p className="text-error-400 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export const MultiSelect = ({
  label,
  options,
  placeholder = "Select an option",
  name,
  control,
  defaultValue = [],
  className,
  error,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const { field } = useController({ name, control, defaultValue });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && e.target instanceof Node) {
        if (!selectRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (option: SelectOptions) => {
    const isSelected = field.value.some(
      (item: SelectOptions) => item.value === option.value,
    );

    const newSelection = isSelected
      ? field.value.filter((item: SelectOptions) => item.value !== option.value)
      : [...field.value, option];

    field.onChange(newSelection);
  };

  const getButtonText = () => {
    if (!field.value || field.value.length === 0) return placeholder;
    else if (field.value.length === 1) return field.value[0].label;
    else return `${field.value.length} options selected`;
  };

  return (
    <div className={cn("relative w-full", className)} ref={selectRef}>
      <h2 className="text-white">{label}</h2>
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between px-4 py-2 text-left",
          "border border-zinc-100/20 bg-white/10 hover:border-zinc-50/20",
          "rounded-xl outline-none focus:border-blue-400/40",
          error && "border-error-400",
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        {...field}
        value={undefined}
        onChange={undefined}
      >
        <span>{getButtonText()}</span>
        <span className="pointer-events-none ml-2">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </button>
      {isOpen && (
        <div
          className={cn(
            "rounded-mg absolute z-10 mt-1 w-full overflow-auto border",
            "max-h-60 rounded-lg border-zinc-200/10 bg-zinc-800 shadow-lg",
          )}
        >
          <ul className="py-1">
            {options.map((option) => {
              const isSelected = field.value.some(
                (item: SelectOptions) => item.value === option.value,
              );
              return (
                <li
                  key={option.value}
                  onClick={() => toggleOption(option)}
                  className={`flex cursor-pointer items-center px-3 py-2 hover:bg-blue-100/20 ${isSelected ? "bg-blue-50/20" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    readOnly
                  />
                  <span className="ml-2">{option.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && <p className="text-error-400 mt-1 text-sm">{error}</p>}
    </div>
  );
};
