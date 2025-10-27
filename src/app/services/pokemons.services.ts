"use server";

import { cache } from "react";
import {
  getTotalPokemonsCount,
  listPokemons,
} from "../../server/db/pokemons.db";
import type { PokemonListData, PokemonQueryParams } from "./pokemonList.types";

interface Pagination {
  currentPage: number;
  totalPages: number;
}
const LIMIT = 8;

export const getPokemons = cache(
  async (searchParams?: PokemonQueryParams): Promise<PokemonListData[]> => {
    const params = searchParams ?? {};
    const currentPage = Number(searchParams?.page) ?? 1;
    const offset = (currentPage - 1) * LIMIT;
    const res = await listPokemons({
      limit: LIMIT,
      offset,
      ...params,
    });

    return res.map((r) => ({
      id: r.id,
      name: r.name,
      generation: r.generation,
      types: r.types,
      image: r.image ?? "/images/no-img.jpg",
    }));
  },
);

export const getPaginationData = cache(
  async (searchParams?: PokemonQueryParams): Promise<Pagination> => {
    const params = searchParams ?? {};
    const total = await getTotalPokemonsCount(params);
    const currentPage = searchParams?.page ?? 1;
    const totalPages = Math.ceil(total / LIMIT);
    return { currentPage, totalPages };
  },
);
