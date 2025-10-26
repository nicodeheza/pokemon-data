import { and, count, eq } from "drizzle-orm";
import { db } from ".";
import { pokemonTable } from "./schema";
import type { Generations } from "~/types/pokemon.types";

interface Search {
  generation?: Generations;
}

function getWhere(search: Search) {
  return and(
    search.generation
      ? eq(pokemonTable.generation, search.generation)
      : undefined,
  );
}

export const listPokemons = (
  search: {
    limit: number;
    offset: number;
  } & Search,
) => {
  return db.query.pokemonTable.findMany({
    limit: search.limit,
    offset: search.offset,
    columns: {
      id: true,
      name: true,
      generation: true,
      types: true,
      image: true,
    },
    where: getWhere({ generation: search.generation }),
    orderBy: (pokemons, { asc }) => [asc(pokemons.id)],
  });
};

export const getTotalPokemonsCount = async (search: Search) => {
  const result = await db
    .select({ count: count() })
    .from(pokemonTable)
    .where(getWhere(search));
  return result[0]?.count ?? 0;
};
