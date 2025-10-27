"use server";

import { getPokemonDetailsData } from "~/server/db/pokemons.db";
import type { PokemonsDetails, PokemonEvolution } from "./pokemonDetails.types";

const DEFAULT_IMAGE = "/images/no-img.jpg";

export const getPokemonsDetails = async (
  id: number,
): Promise<PokemonsDetails | undefined> => {
  const res = await getPokemonDetailsData(id);
  const base = res[0];
  if (!base) return;

  const pokemonData: Omit<PokemonsDetails, "evolutions"> = {
    id: base.id,
    name: base.name,
    image: base.image ?? DEFAULT_IMAGE,
    generation: base.generation,
    stats: base.stats ?? [],
    type: base.types,
  };

  const evolutions = res.map<PokemonEvolution>(({ evolutions }) => ({
    id: evolutions.id,
    name: evolutions.name,
    image: evolutions.image ?? DEFAULT_IMAGE,
    evolutionId: evolutions.evolutionId,
    evolutionStage: evolutions.stage,
  }));

  return {
    ...pokemonData,
    evolutions,
  };
};
