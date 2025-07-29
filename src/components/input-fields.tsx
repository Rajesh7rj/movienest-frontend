// components/InputField.tsx
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function InputField({ label, register, error, ...rest }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1 text-white">{label}</label>
      <input
        {...register}
        {...rest}
        className="w-full px-4 py-2 rounded-md bg-[#224957] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
