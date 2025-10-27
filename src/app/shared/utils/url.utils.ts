export const objectToSearchParams = (
  object: Record<string, string | number | undefined>,
): string => {
  const parsedObject = Object.entries(object).reduce(
    (acc, [key, value]) => {
      if (!value) return acc;
      acc[key] = String(value);
      return acc;
    },
    {} as Record<string, string>,
  );

  return new URLSearchParams(parsedObject).toString();
};
