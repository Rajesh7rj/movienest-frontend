import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | "ghost";
}

export default function Button({ children, className, variant = 'primary', ...rest }: ButtonProps) {
  const baseStyle =
    'text-white font-medium py-2 px-4 rounded transition focus:outline-none';

  const variants = {
    primary: `bg-[#2BD17E] hover:bg-[#1fb352]`,
    secondary: 'hover:bg-[#224957] border border-white',
    ghost:""
  };

  return (
    <button
      {...rest}
      className={clsx(baseStyle, variants[variant], className)}
    >
      {children}
    </button>
  );
}
