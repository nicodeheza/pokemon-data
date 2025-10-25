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
import type { PokemonTypes } from "~/types/pokemon.types";
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

async function insertEvolutionStage(
  species: SpecieDetails[] | undefined,
): Promise<number | undefined> {
  if (!species) return;

  const [res] = await db
    .insert(schema.evolutionStageTable)
    .values({})
    .returning({ id: schema.evolutionStageTable.id });
  const id = res?.id;
  if (!id) return;
  await Promise.all(
    species.map(async (s) => {
      db.insert(schema.evolutionStageSpeciesTable).values({
        stageId: id,
        specieId: s.id,
      });
    }),
  );

  return id;
}

async function insertFromEvolution(evolutionUrl: string) {
  const evolution = await getEvolution(evolutionUrl);

  const [firstSpecieUrls, secondSpecieUrls, thirdSpecieUrls] =
    getEvolutionsSpeciesUrls(evolution.chain);

  const firstSpecies =
    firstSpecieUrls &&
    (await Promise.all(firstSpecieUrls.map((url) => insertSpecie(url))));
  const secondSpecies =
    secondSpecieUrls &&
    (await Promise.all(secondSpecieUrls.map((url) => insertSpecie(url))));
  const thirdSpecies =
    thirdSpecieUrls &&
    (await Promise.all(thirdSpecieUrls.map((url) => insertSpecie(url))));

  const firstId = await insertEvolutionStage(firstSpecies);
  const secondId = await insertEvolutionStage(secondSpecies);
  const thirdId = await insertEvolutionStage(thirdSpecies);

  await db.insert(schema.evolutionsTable).values({
    id: evolution.id,
    first: firstId,
    second: secondId,
    third: thirdId,
  });

  await insertPokemonFromMaySpecies(firstSpecies, evolution.id);
  await insertPokemonFromMaySpecies(secondSpecies, evolution.id);
  await insertPokemonFromMaySpecies(thirdSpecies, evolution.id);
}

async function insertPokemonFromMaySpecies(
  species: SpecieDetails[] | undefined,
  evolutionId: number,
) {
  if (!species) return;

  await Promise.all(
    species.map((s) => insertPokemonsFromEspecie(s, evolutionId)),
  );
}

async function insertSpecie(specieUrl: string): Promise<SpecieDetails> {
  const specie = await getSpecieDetails(specieUrl);
  await db.insert(schema.specieTable).values({ id: specie.id });
  return specie;
}

async function insertPokemonsFromEspecie(
  specie: SpecieDetails,
  evolutionId: number,
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
      });

      await db.insert(schema.speciesPokemonsTable).values({
        specieId: specie.id,
        pokemonId: pokemon.id,
      });
    }),
  );
}

function getTypes(types: PokemonDetails["types"]): PokemonTypes[] {
  return types.map((t) => t.type.name);
}

function getStats(stats: PokemonDetails["stats"]): schema.Stat[] {
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
