import { db } from ".";

export const listPokemons = () => {
  return db.query.pokemonTable.findMany({
    limit: 20,
    columns: {
      id: true,
      name: true,
      generation: true,
      types: true,
      image: true,
    },
    orderBy: (pokemons, { asc }) => [asc(pokemons.id)],
  });
};
