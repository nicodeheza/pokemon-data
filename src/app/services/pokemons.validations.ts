import z from "zod";

export const pokemonQueryParamsSchema = z.object({
  page: z.coerce.number().min(1).optional(),
});

export function validatePokemonParams(values: unknown) {
  try {
    return pokemonQueryParamsSchema.parse(values);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const param = error.issues[0]?.path[0];
      return { error: `Invalid search param: ${param}` };
    }
  }
}
