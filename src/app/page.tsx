import { Suspense } from "react";
import { getPokemons } from "~/app/services/pokemons.services";
import { PokemonList } from "./components/pokemon-list/PokemonList.component";
import type { PokemonQueryParams } from "./services/pokemonList.types";
import { validatePokemonParams } from "./services/pokemons.validations";
import { Pagination } from "./components/Pagination.component";
import { FilterBar } from "./components/FilterBar.component";

interface Props {
  searchParams?: Promise<PokemonQueryParams>;
}

export default async function HomePage({ searchParams }: Props) {
  const pokemonsSearch = validatePokemonParams(await searchParams);

  if (pokemonsSearch && "error" in pokemonsSearch)
    return <p className="text-red-500">{pokemonsSearch.error}</p>;

  const pokemonsRes = await getPokemons(pokemonsSearch);

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
        <Suspense fallback={<p>Loading...</p>} key={getSuspenseKeys()}>
          <PokemonList pokemons={pokemonsRes.data} />
        </Suspense>
        <Pagination
          totalPages={pokemonsRes.totalPages}
          currentPage={pokemonsRes.currentPage}
        />
      </div>
    </main>
  );
}
