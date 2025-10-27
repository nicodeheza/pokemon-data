import type {
  EvolutionSteps,
  PokemonTypes,
  Stat,
  Generations,
} from "~/types/pokemon.types";

export interface PokemonEvolution {
  id: number;
  name: string;
  image: string;
  evolutionId: number;
  evolutionStage: EvolutionSteps;
}

export interface PokemonsDetails {
  id: number;
  name: string;
  image: string;
  type: PokemonTypes[];
  stats: Stat[];
  generation: Generations;
  evolutions: PokemonEvolution[];
}
