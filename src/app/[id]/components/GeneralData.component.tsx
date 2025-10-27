import Image from "next/image";
import type { FC } from "react";
import type { Generations, PokemonTypes } from "~/types/pokemon.types";
import { Pill } from "~/components/Pill.component";
import { GenerationToLabelMap, typeColors } from "~/app/shared/maps";

interface Props {
  id: number;
  name: string;
  image: string;
  generation: Generations;
  type: PokemonTypes[];
}

export const GeneralData: FC<Props> = ({
  id,
  name,
  image,
  generation,
  type,
}) => {
  return (
    <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-xl">
      <Header id={id} name={name} />

      <div className="grid gap-8 p-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl bg-gray-50 p-8">
          <Image src={image} alt={name} width={300} height={300} />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <Generation generation={generation} />
          <Types type={type} />
        </div>
      </div>
    </div>
  );
};

interface HeaderProps {
  id: number;
  name: string;
}

const Header: FC<HeaderProps> = ({ id, name }) => {
  return (
    <div className="bg-blue-500 p-6">
      <h1 className="mb-2 text-4xl font-bold text-white capitalize">{name}</h1>
      <p className="text-lg text-blue-100">#{id}</p>
    </div>
  );
};

interface TypesProps {
  type: PokemonTypes[];
}

const Types: FC<TypesProps> = ({ type }) => {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase">
        Types
      </h2>
      <div className="flex flex-wrap gap-2">
        {type.map((t) => (
          <Pill key={t} bgColor={typeColors[t]}>
            {t}
          </Pill>
        ))}
      </div>
    </div>
  );
};

interface GenerationProps {
  generation: Generations;
}

const Generation: FC<GenerationProps> = ({ generation }) => {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold tracking-wide text-gray-500 uppercase">
        Generation
      </h2>
      <p className="text-2xl font-bold text-gray-800">
        {GenerationToLabelMap[generation]}
      </p>
    </div>
  );
};
