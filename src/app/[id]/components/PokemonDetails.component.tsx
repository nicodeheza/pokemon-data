import type { FC } from "react";
import type { PokemonsDetails } from "../services/pokemonDetails.types";
import { GeneralData } from "./GeneralData.component";
import { Stats } from "./Stats.component";
import { Evolutions } from "./Evolutions.component";

interface Props {
  pokemonDetails: PokemonsDetails;
}

export const PokemonDetails: FC<Props> = ({ pokemonDetails }) => {
  const { name, image, generation, type, evolutions, stats, id } =
    pokemonDetails;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <GeneralData
        id={id}
        name={name}
        image={image}
        generation={generation}
        type={type}
      />

      <Stats stats={stats} />

      <Evolutions evolutions={evolutions} currentPokemonId={id} />
    </div>
  );
};
