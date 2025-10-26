import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useReplaceSearchParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (newParams: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      if (params.size === 0) return router.replace(pathname);

      const path = pathname + "?" + params.toString();

      router.replace(path);
    },
    [pathname, router, searchParams],
  );
}
