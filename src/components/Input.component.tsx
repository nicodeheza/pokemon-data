import { useId, type FC } from "react";
import { cn } from "~/lib/utils";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: FC<Props> = ({
  className,
  type,
  label,
  error,
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={cn(
          "flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white",
          "placeholder:text-gray-400",
          "focus:border-transparent focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none",
          "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50",
          "transition-colors duration-200",
          error && "border-red-500 focus:ring-red-500",
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
