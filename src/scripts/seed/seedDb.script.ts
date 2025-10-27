import { drizzle } from "drizzle-orm/libsql";
import {
  getEvolution,
  getEvolutionList,
  getPokemonDetails,
  getSpecieDetails,
  type ChainLink,
  type PokemonDetails,
  type SpecieDetails,
} from "./fetchPokeApi.script";
import * as schema from "~/server/db/schema";
import type { EvolutionSteps, PokemonTypes, Stat } from "~/types/pokemon.types";
import { createClient } from "@libsql/client";

const client = createClient({ url: process.env.DATABASE_URL ?? "" });
const db = drizzle(client, { schema });

async function seedDatabase() {
  console.log("Seeding DB, please wait...");
  let nextUrl: string | null = null;

  do {
    const evolutionChainList = await getEvolutionList(10, nextUrl);
    await Promise.all(
      evolutionChainList.results.map((data) => insertFromEvolution(data.url)),
    );

    nextUrl = evolutionChainList.next;
  } while (nextUrl);
}

function getEvolutionsSpeciesUrls(chain: ChainLink): string[][] {
  const stages: string[][] = [];

  function traverse(link: ChainLink, depth: number) {
    stages[depth] ??= [];
    stages[depth].push(link.species.url);
    link.evolves_to.forEach((evolution) => {
      traverse(evolution, depth + 1);
    });
  }

  traverse(chain, 0);
  return stages;
}

async function insertFromEvolution(evolutionUrl: string) {
  const evolution = await getEvolution(evolutionUrl);

  const [firstSpecieUrls, secondSpecieUrls, thirdSpecieUrls] =
    getEvolutionsSpeciesUrls(evolution.chain);

  const firstSpecies =
    firstSpecieUrls &&
    (await Promise.all(firstSpecieUrls.map((url) => getSpecieDetails(url))));
  const secondSpecies =
    secondSpecieUrls &&
    (await Promise.all(secondSpecieUrls.map((url) => getSpecieDetails(url))));
  const thirdSpecies =
    thirdSpecieUrls &&
    (await Promise.all(thirdSpecieUrls.map((url) => getSpecieDetails(url))));

  await db.insert(schema.evolutionsTable).values({
    id: evolution.id,
  });

  await insertPokemonFromMaySpecies(firstSpecies, evolution.id, "first");
  await insertPokemonFromMaySpecies(secondSpecies, evolution.id, "second");
  await insertPokemonFromMaySpecies(thirdSpecies, evolution.id, "third");
}

async function insertPokemonFromMaySpecies(
  species: SpecieDetails[] | undefined,
  evolutionId: number,
  evolutionStep: EvolutionSteps,
) {
  if (!species) return;

  await Promise.all(
    species.map((s) => insertPokemonsFromSpecie(s, evolutionId, evolutionStep)),
  );
}

async function insertPokemonsFromSpecie(
  specie: SpecieDetails,
  evolutionId: number,
  evolutionStep: EvolutionSteps,
) {
  const pokemonsUrls = specie.varieties.map((v) => v.pokemon.url);

  await Promise.all(
    pokemonsUrls.map(async (url) => {
      const pokemon = await getPokemonDetails(url);

      await db.insert(schema.pokemonTable).values({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        types: getTypes(pokemon.types),
        stats: getStats(pokemon.stats),
        generation: specie.generation.name,
        evolutionId,
        evolutionStage: evolutionStep,
      });
    }),
  );
}

function getTypes(types: PokemonDetails["types"]): PokemonTypes[] {
  return types.map((t) => t.type.name);
}

function getStats(stats: PokemonDetails["stats"]): Stat[] {
  return stats.map((s) => ({
    base: s.base_stat,
    effort: s.effort,
    name: s.stat.name,
  }));
}

seedDatabase()
  .then(() => {
    console.log("Db was seeded successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
