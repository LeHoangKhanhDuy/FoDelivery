import type { ReactNode } from 'react';

interface ProductFormLabelProps {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}

export const ProductFormLabel = ({ htmlFor, children, required = false }: ProductFormLabelProps) => (
  <label htmlFor={htmlFor} className="text-xs font-semibold text-slate-700">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);
