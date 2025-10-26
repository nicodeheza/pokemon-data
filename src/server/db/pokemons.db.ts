import { and, count, eq, sql } from "drizzle-orm";
import { db } from ".";
import { pokemonTable } from "./schema";
import type { Generations, PokemonTypes } from "~/types/pokemon.types";

interface Search {
  generation?: Generations;
  type?: PokemonTypes;
}

function getWhere(search: Search) {
  return and(
    search.generation
      ? eq(pokemonTable.generation, search.generation)
      : undefined,
    search.type
      ? sql`EXISTS (
      SELECT 1
      FROM json_each(${pokemonTable.types})
      WHERE json_each.value = ${search.type}
    )`
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
    where: getWhere({ generation: search.generation, type: search.type }),
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
