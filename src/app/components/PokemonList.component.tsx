import type { FC } from "react";
import { PokemonCard } from "./PokemonCard.component";
import type { PokemonQueryParams } from "~/app/services/pokemonList.types";
import { getPokemons } from "~/app/services/pokemons.services";

interface Props {
  queryParams?: PokemonQueryParams;
}

export const PokemonList: FC<Props> = async ({ queryParams }) => {
  const pokemons = await getPokemons(queryParams);
  if (!pokemons.length) return <NotPokemonsFound />;
  return (
    <div className="grid w-full max-w-5xl grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-items-center gap-4 p-8">
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
