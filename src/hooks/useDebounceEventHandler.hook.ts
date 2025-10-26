import { useRef } from "react";

export function useDebounceEventHandler<T>(
  handler: (value: T) => void,
  delayInMs = 500,
) {
  const timeout = useRef<NodeJS.Timeout>(undefined);

  return (value: T) => {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      handler(value);
    }, delayInMs);
  };
}
