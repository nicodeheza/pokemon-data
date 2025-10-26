"use server";

import { cache } from "react";
import {
  getTotalPokemonsCount,
  listPokemons,
} from "../../server/db/pokemons.db";
import type { PokemonListData, PokemonQueryParams } from "./pokemonList.types";

interface PaginatedRes<T> {
  currentPage: number;
  totalPages: number;
  data: T;
}

export const getPokemons = cache(
  async (
    searchParams?: PokemonQueryParams,
  ): Promise<PaginatedRes<PokemonListData[]>> => {
    const params = searchParams ?? {};
    const limit = 8;
    const total = await getPokemonsCount(params);
    const currentPage = searchParams?.page ?? 1;
    const totalPages = Math.ceil(total / limit);
    const offset = (currentPage - 1) * limit;
    const res = await listPokemons({
      limit,
      offset,
      ...params,
    });

    const data = res.map((r) => ({
      id: r.id,
      name: r.name,
      generation: r.generation,
      types: r.types,
      image: r.image ?? "/images/no-img.jpg",
    }));

    return {
      totalPages,
      currentPage,
      data,
    };
  },
);

const getPokemonsCount = cache((params: PokemonQueryParams) =>
  getTotalPokemonsCount(params),
);
