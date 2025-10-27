import { PokemonDetails } from "./components/PokemonDetails.component";
import { getPokemonsDetails } from "./services/pokemonDetails.service";
import { notFound } from "next/navigation";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const pokemon = await getPokemonsDetails(id);

  if (!pokemon) notFound();

  return <PokemonDetails pokemonDetails={pokemon} />;
}
