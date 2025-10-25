import { Suspense } from "react";
import { getPokemons } from "~/app/services/pokemons.services";
import { PokemonList } from "./components/pokemon-list/PokemonList.component";
import { Pagination } from "./components/Pagination.component";

export default async function HomePage() {
  const pokemons = await getPokemons();

  return (
    <main>
      <div className="flex flex-col items-center justify-center pb-6">
        <Suspense fallback={<p>Loading...</p>}>
          <PokemonList pokemons={pokemons} />
        </Suspense>
        <Pagination totalPages={10} />
      </div>
    </main>
  );
}
