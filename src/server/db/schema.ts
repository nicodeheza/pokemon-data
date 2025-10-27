import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";
import type {
  EvolutionSteps,
  Generations,
  PokemonTypes,
  Stat,
} from "~/types/pokemon.types";

export const pokemonTable = sqliteTable("pokemon", {
  id: int().primaryKey().notNull(),
  name: text().notNull(),
  image: text(),
  generation: text().$type<Generations>().notNull(),
  types: text({ mode: "json" }).$type<PokemonTypes[]>().notNull(),
  evolutionId: int()
    .notNull()
    .references(() => evolutionsTable.id),
  evolutionStage: text().$type<EvolutionSteps>().notNull(),
  stats: text({ mode: "json" }).$type<Stat[]>(),
});

export const evolutionsTable = sqliteTable("evolution", {
  id: int().primaryKey({ autoIncrement: true }),
});
