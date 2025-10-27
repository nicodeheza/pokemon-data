import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import type { PokemonListData } from "~/app/services/pokemonList.types";
import { GenerationToLabelMap, typeColors } from "~/app/shared/maps";
import { Pill } from "~/components/Pill.component";

export const PokemonCard: FC<PokemonListData> = ({
  name,
  image,
  generation,
  types,
  id,
}) => {
  return (
    <div className="max-w-xs cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105">
      <Link href={`/${id}`}>
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
      </Link>
    </div>
  );
};
