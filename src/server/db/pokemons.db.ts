import { count } from "drizzle-orm";
import { db } from ".";
import { pokemonTable } from "./schema";

export const listPokemons = (search: { limit: number; offset: number }) => {
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
    orderBy: (pokemons, { asc }) => [asc(pokemons.id)],
  });
};

export const getTotalPokemonsCount = async () => {
  const result = await db.select({ count: count() }).from(pokemonTable);
  return result[0]?.count ?? 0;
};
