import { Spinner } from "./ui/spinner";

export function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
}
