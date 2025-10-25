import type { ReactNode, FC } from "react";
export type PillColors =
  | "bg-gray-400"
  | "bg-red-700"
  | "bg-indigo-400"
  | "bg-purple-500"
  | "bg-yellow-600"
  | "bg-yellow-800"
  | "bg-green-500"
  | "bg-purple-700"
  | "bg-gray-500"
  | "bg-orange-500"
  | "bg-blue-500"
  | "bg-green-600"
  | "bg-yellow-400"
  | "bg-pink-500"
  | "bg-cyan-400"
  | "bg-indigo-700"
  | "bg-gray-800"
  | "bg-pink-300"
  | "bg-purple-400"
  | "bg-gray-600";

interface PillProps {
  children: ReactNode;
  bgColor: PillColors;
}
export const Pill: FC<PillProps> = ({ children, bgColor }) => {
  return (
    <span
      className={`${bgColor ?? "bg-gray-400"} rounded-full px-3 py-1 text-sm font-semibold text-white capitalize shadow-sm`}
    >
      {children}
    </span>
  );
};
