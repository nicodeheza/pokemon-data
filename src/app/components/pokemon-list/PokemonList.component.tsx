import type { FC } from "react";
import type { PokemonListData } from "~/app/types/pokemonList.types";
import { PokemonCard } from "../pokemon-card/PokemonCard.component";

interface Props {
  pokemons: PokemonListData[];
}

export const PokemonList: FC<Props> = ({ pokemons }) => {
  return (
    <div className="m-8 grid w-full max-w-5xl grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </div>
  );
};
