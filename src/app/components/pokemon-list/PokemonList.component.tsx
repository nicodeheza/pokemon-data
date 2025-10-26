import type { FC } from "react";
import type { PokemonListData } from "~/app/services/pokemonList.types";
import { PokemonCard } from "../pokemon-card/PokemonCard.component";

interface Props {
  pokemons: PokemonListData[];
}

export const PokemonList: FC<Props> = ({ pokemons }) => {
  if (!pokemons.length) return <NotPokemonsFound />;
  return (
    <div className="m-8 grid w-full max-w-5xl grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </div>
  );
};

const NotPokemonsFound: FC = () => {
  return (
    <div className="flex min-h-[400px] w-full max-w-5xl flex-col items-center justify-center p-12 text-center">
      <h3 className="mb-2 text-xl font-semibold">No Pokémon Found 🔎</h3>
      <p className="text-sm text-gray-500">
        Try adjusting your filters or search terms to find what you&apos;re
        looking for.
      </p>
    </div>
  );
};
