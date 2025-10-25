import type { Generations, PokemonTypes } from "~/types/pokemon.types";

export interface PokemonListData {
  name: string;
  image: string;
  generation: Generations;
  types: PokemonTypes[];
  id: number;
}
