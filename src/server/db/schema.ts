import { sqliteTable, int, text, primaryKey } from "drizzle-orm/sqlite-core";
import type { Generations, PokemonTypes } from "~/types/pokemon.types";

export interface Stat {
  base: number;
  effort: number;
  name: string;
}

export const pokemonTable = sqliteTable("pokemon", {
  id: int().primaryKey().notNull(),
  name: text().notNull(),
  image: text(),
  generation: text().$type<Generations>().notNull(),
  types: text({ mode: "json" }).$type<PokemonTypes[]>().notNull(),
  evolutionId: int()
    .notNull()
    .references(() => evolutionsTable.id),
  stats: text({ mode: "json" }).$type<Stat[]>(),
});

export const evolutionsTable = sqliteTable("evolution", {
  id: int().primaryKey({ autoIncrement: true }),
  first: int().references(() => evolutionStageTable.id),
  second: int().references(() => evolutionStageTable.id),
  third: int().references(() => evolutionStageTable.id),
});

export const evolutionStageTable = sqliteTable("evolution_stage", {
  id: int().primaryKey({ autoIncrement: true }),
});

export const evolutionStageSpeciesTable = sqliteTable(
  "evolution_species",
  {
    stageId: int()
      .references(() => evolutionStageTable.id)
      .notNull(),
    specieId: int()
      .references(() => specieTable.id)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.stageId, table.specieId] })],
);

export const specieTable = sqliteTable("specie", {
  id: int().primaryKey().notNull(),
});

export const speciesPokemonsTable = sqliteTable(
  "species_pokemon",
  {
    specieId: int()
      .references(() => specieTable.id)
      .notNull(),
    pokemonId: int()
      .references(() => pokemonTable.id)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.specieId, table.pokemonId] })],
);
