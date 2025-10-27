export const GENERATIONS = [
  "generation-i",
  "generation-ii",
  "generation-iii",
  "generation-iv",
  "generation-v",
  "generation-vi",
  "generation-vii",
  "generation-viii",
  "generation-ix",
] as const;

export type Generations = (typeof GENERATIONS)[number];

export const POKEMON_TYPES = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
  "stellar",
  "unknown",
] as const;

export type PokemonTypes = (typeof POKEMON_TYPES)[number];

export interface Stat {
  base: number;
  effort: number;
  name: string;
}

export type EvolutionSteps = "first" | "second" | "third";
