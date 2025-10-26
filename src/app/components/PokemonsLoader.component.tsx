import type { FC } from "react";
import { Spinner } from "~/components/ui/spinner";

export const PokemonsLoader: FC = () => {
  return (
    <div className="flex min-h-[600px] w-full max-w-5xl items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
};
