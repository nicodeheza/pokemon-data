import Image from "next/image";
import Link from "next/link";
import { useMemo, type FC } from "react";
import type { PokemonEvolution } from "../services/pokemonDetails.types";
import type { EvolutionSteps } from "~/types/pokemon.types";
import { cn } from "~/lib/utils";

interface Props {
  evolutions: PokemonEvolution[];
  currentPokemonId: number;
}

export const Evolutions: FC<Props> = ({ evolutions, currentPokemonId }) => {
  const groupedEvolutions = useMemo(
    () =>
      evolutions.reduce(
        (acc, evolution) => {
          const step = evolution.evolutionStage;
          acc[step] ??= [];
          acc[step].push(evolution);
          return acc;
        },
        {} as Record<string, PokemonEvolution[]>,
      ),

    [evolutions],
  );
  const orderedSteps = useMemo(() => {
    const stepOrder: EvolutionSteps[] = ["first", "second", "third"];
    return stepOrder.filter((step) => groupedEvolutions[step]);
  }, [groupedEvolutions]);

  if (!evolutions || evolutions.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
      <Header />
      <div className="flex flex-col items-center justify-center gap-4 p-6 md:flex-row md:flex-wrap md:gap-6">
        {orderedSteps.map((step, stepIndex) => (
          <div
            key={step}
            className="flex w-full flex-col items-center md:w-auto md:flex-row md:gap-4"
          >
            <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-col">
              {groupedEvolutions[step]?.map((evolution) => (
                <PokemonCard
                  key={evolution.id}
                  evolution={evolution}
                  isCurrentPokemon={evolution.id === currentPokemonId}
                />
              ))}
            </div>

            {stepIndex < orderedSteps.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
    </div>
  );
};
const Header: FC = () => {
  return (
    <div className="border-b border-gray-200 bg-blue-600 px-6 py-4">
      <h2 className="text-2xl font-bold text-white">Evolution Chain</h2>
    </div>
  );
};

interface PokemonCardProps {
  evolution: PokemonEvolution;
  isCurrentPokemon: boolean;
}

const PokemonCard: FC<PokemonCardProps> = ({ evolution, isCurrentPokemon }) => {
  return (
    <Link
      key={evolution.id}
      href={`/${evolution.id}`}
      className="group flex w-full max-w-xs flex-col items-center transition-transform hover:scale-105 md:w-auto"
    >
      <div
        className={cn(
          isCurrentPokemon && "border-4 border-blue-500",
          "overflow-hidden rounded-xl bg-gray-100 p-4 shadow-md",
        )}
      >
        <Image
          src={evolution.image}
          alt={evolution.name}
          width={120}
          height={120}
        />
      </div>
      <p className="mt-3 text-center text-lg font-semibold text-gray-800 capitalize group-hover:text-indigo-600">
        {evolution.name}
      </p>
      <p className="text-sm text-gray-500">#{evolution.id}</p>
    </Link>
  );
};

const Arrow: FC = () => {
  return (
    <div
      className="my-2 text-4xl text-gray-400 md:my-0 md:pb-10"
      aria-label="evolves to"
    >
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </div>
  );
};
