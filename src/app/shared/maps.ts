import type { PillColors } from "~/components/Pill.component";
import type { Generations, PokemonTypes } from "~/types/pokemon.types";

export const typeColors: Record<PokemonTypes, PillColors> = {
  normal: "bg-gray-400",
  fighting: "bg-red-700",
  flying: "bg-indigo-400",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  rock: "bg-yellow-800",
  bug: "bg-green-500",
  ghost: "bg-purple-700",
  steel: "bg-gray-500",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  grass: "bg-green-600",
  electric: "bg-yellow-400",
  psychic: "bg-pink-500",
  ice: "bg-cyan-400",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  fairy: "bg-pink-300",
  stellar: "bg-purple-400",
  unknown: "bg-gray-600",
};

export const GenerationToLabelMap: Record<Generations, string> = {
  "generation-i": "Generation I",
  "generation-ii": "Generation II",
  "generation-iii": "Generation III",
  "generation-iv": "Generation IV",
  "generation-v": "Generation V",
  "generation-vi": "Generation VI",
  "generation-vii": "Generation VII",
  "generation-viii": "Generation VIII",
  "generation-ix": "Generation IX",
};
