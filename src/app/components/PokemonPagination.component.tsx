import { Pagination } from "~/components/Pagination.component";
import type { PokemonQueryParams } from "../services/pokemonList.types";
import type { FC } from "react";
import { getPaginationData } from "../services/pokemons.services";

interface Props {
  searchParams?: PokemonQueryParams;
}

export const PokemonPagination: FC<Props> = async ({ searchParams }) => {
  const { totalPages } = await getPaginationData(searchParams ?? {});

  console.log(totalPages, searchParams);
  return <Pagination totalPages={totalPages} />;
};
