import type z from "zod";
import type { Generations, PokemonTypes } from "~/types/pokemon.types";
import { type pokemonQueryParamsSchema } from "./pokemons.validations";

export interface PokemonListData {
  name: string;
  image: string;
  generation: Generations;
  types: PokemonTypes[];
  id: number;
}

export type PokemonQueryParams = z.infer<typeof pokemonQueryParamsSchema>;
