import { and, count, eq, inArray, sql } from "drizzle-orm";
import { db } from ".";
import { pokemonTable } from "./schema";
import type { Generations, PokemonTypes } from "~/types/pokemon.types";
import { alias } from "drizzle-orm/sqlite-core";

interface Search {
  generation?: Generations;
  type?: PokemonTypes;
  name?: string;
}

async function getListWhere({ generation, type, name }: Search) {
  const conditions = [];

  if (generation) conditions.push(eq(pokemonTable.generation, generation));
  if (type)
    conditions.push(sql`EXISTS (
      SELECT 1
      FROM json_each(${pokemonTable.types})
      WHERE json_each.value = ${type}
    )`);

  if (name) {
    const res = await getPokemonsByNameEvolutionIds(name);
    const evolutionIds = res.map((r) => r.evolutionId);
    if (evolutionIds)
      conditions.push(inArray(pokemonTable.evolutionId, evolutionIds));
  }

  return and(...conditions);
}

export const listPokemons = async (
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
    where: await getListWhere({
      generation: search.generation,
      type: search.type,
      name: search.name,
    }),
    orderBy: (pokemons, { asc }) => [asc(pokemons.id)],
  });
};

export const getTotalPokemonsCount = async (search: Search) => {
  const result = await db
    .select({ count: count() })
    .from(pokemonTable)
    .where(await getListWhere(search));
  return result[0]?.count ?? 0;
};

function getPokemonsByNameEvolutionIds(name: string) {
  return db.query.pokemonTable.findMany({
    columns: {
      evolutionId: true,
    },
    where: sql`lower(${pokemonTable.name}) like lower(${`${name}%`})`,
  });
}

const evolutionPokemon = alias(pokemonTable, "evolutionPokemon");
export const getPokemonDetailsData = async (id: number) => {
  return db
    .select({
      id: pokemonTable.id,
      name: pokemonTable.name,
      image: pokemonTable.image,
      generation: pokemonTable.generation,
      types: pokemonTable.types,
      stats: pokemonTable.stats,
      evolutions: {
        id: evolutionPokemon.id,
        name: evolutionPokemon.name,
        image: evolutionPokemon.image,
        evolutionId: evolutionPokemon.evolutionId,
        stage: evolutionPokemon.evolutionStage,
      },
    })
    .from(pokemonTable)
    .where(eq(pokemonTable.id, id))
    .innerJoin(
      evolutionPokemon,
      eq(evolutionPokemon.evolutionId, pokemonTable.evolutionId),
    );
};
