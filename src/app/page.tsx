import { Suspense } from "react";
import { PokemonList } from "./components/pokemon-list/PokemonList.component";
import type { PokemonQueryParams } from "./services/pokemonList.types";
import { validatePokemonParams } from "./services/pokemons.validations";
import { FilterBar } from "./components/FilterBar.component";
import { PokemonPagination } from "./components/PokemonPagination.component";
import { PokemonsLoader } from "./components/PokemonsLoader.component";

interface Props {
  searchParams?: Promise<PokemonQueryParams>;
}

export default async function HomePage({ searchParams }: Props) {
  const pokemonsSearch = validatePokemonParams(await searchParams);

  if (pokemonsSearch && "error" in pokemonsSearch)
    return <p className="text-red-500">{pokemonsSearch.error}</p>;

  const getSuspenseKeys = () => {
    const name = pokemonsSearch?.name ?? "allNames";
    const type = pokemonsSearch?.type ?? "allTypes";
    const generation = pokemonsSearch?.generation ?? "allGenerations";
    const page = pokemonsSearch?.page ?? 1;
    return [name, type, generation, page].join("-");
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-center pb-6">
        <FilterBar />
        <Suspense fallback={<PokemonsLoader />} key={getSuspenseKeys()}>
          <PokemonList queryParams={pokemonsSearch} />
        </Suspense>
        <PokemonPagination searchParams={pokemonsSearch} />
      </div>
    </main>
  );
}
