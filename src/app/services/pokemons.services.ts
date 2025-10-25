import { listPokemons } from "../../server/db/pokemons.db";
import type { PokemonListData } from "../types/pokemonList.types";

//TODO - cache
export const getPokemons = async (): Promise<PokemonListData[]> => {
  const res = await listPokemons();

  return res.map((r) => ({
    id: r.id,
    name: r.name,
    generation: r.generation,
    types: r.types,
    image: r.image ?? "/images/no-img.jpg",
  }));
};
