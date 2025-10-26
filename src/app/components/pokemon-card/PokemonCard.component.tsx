import Image from "next/image";
import type { FC } from "react";
import type { PokemonListData } from "~/app/services/pokemonList.types";
import { Pill, type PillColors } from "~/components/Pill.component";
import type { Generations, PokemonTypes } from "~/types/pokemon.types";

const typeColors: Record<PokemonTypes, PillColors> = {
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

const GenerationToLabelMap: Record<Generations, string> = {
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

export const PokemonCard: FC<PokemonListData> = ({
  name,
  image,
  generation,
  types,
}) => {
  return (
    <div className="max-w-xs cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="flex h-64 items-center justify-center bg-blue-100 p-6">
        <Image src={image} alt={name} width={192} height={192} />
      </div>

      <div className="p-4">
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-800 capitalize">
          {name}
        </h2>

        <div className="mb-3">
          <p className="text-center text-sm text-gray-600 capitalize">
            {GenerationToLabelMap[generation]}
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-2">
          {types.map((type) => (
            <li key={type}>
              <Pill bgColor={typeColors[type]}>{type}</Pill>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
