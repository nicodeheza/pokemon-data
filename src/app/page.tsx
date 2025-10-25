import { Suspense } from "react";
import { getPokemons } from "~/app/services/pokemons.services";
import { PokemonList } from "./components/pokemon-list/PokemonList.component";

export default async function HomePage() {
  const pokemons = await getPokemons();

  return (
    <main>
      <div className="flex justify-center">
        <Suspense fallback={<p>Loading...</p>}>
          <PokemonList pokemons={pokemons} />
        </Suspense>
      </div>
    </main>
  );
}
