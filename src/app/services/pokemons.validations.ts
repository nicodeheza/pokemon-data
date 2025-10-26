import z from "zod";
import { GENERATIONS, POKEMON_TYPES } from "~/types/pokemon.types";

export const pokemonQueryParamsSchema = z.object({
  page: z.coerce.number().min(1).optional(),
  type: z.enum(POKEMON_TYPES).optional(),
  generation: z.enum(GENERATIONS).optional(),
  name: z.string().optional(),
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

type PokemonQueryParamsKeys = keyof typeof pokemonQueryParamsSchema.shape;

export function cleanPokemonSearchObject(
  value: Record<string, unknown>,
): z.infer<typeof pokemonQueryParamsSchema> {
  try {
    return pokemonQueryParamsSchema.parse(value);
  } catch {
    const validKeys = Object.keys(
      pokemonQueryParamsSchema.shape,
    ) as PokemonQueryParamsKeys[];

    const cleaned: Record<string, unknown> = {};

    validKeys.forEach((key) => {
      const fieldSchema = pokemonQueryParamsSchema.shape[key];
      const result = fieldSchema.safeParse(value[key]);
      if (result.success && result.data !== undefined) {
        cleaned[key] = result.data;
      }
    });

    return cleaned as z.infer<typeof pokemonQueryParamsSchema>;
  }
}
