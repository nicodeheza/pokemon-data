import type { Generations, PokemonTypes } from "~/types/pokemon.types";

const BASE_URL = "https://pokeapi.co/api/v2";

interface PaginatedRes<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

interface EvolutionChainList {
  url: string;
}
export function getEvolutionList(
  limit: number,
  url: string | null,
): Promise<PaginatedRes<EvolutionChainList[]>> {
  const fetchUrl = url ?? `${BASE_URL}/evolution-chain?limit=${limit}`;
  return fetch(fetchUrl).then((res) => res.json());
}

export interface PokemonDetails {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: PokemonTypes;
    };
  }[];
  species: {
    url: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }[];
}

export function getPokemonDetails(url: string): Promise<PokemonDetails> {
  return fetch(url).then((res) => res.json());
}

export interface SpecieDetails {
  id: number;
  generation: {
    name: Generations;
  };
  evolution_chain: {
    url: string;
  };
  varieties: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

export function getSpecieDetails(url: string): Promise<SpecieDetails> {
  return fetch(url).then((res) => res.json());
}

export interface EvolutionChain {
  chain: ChainLink;
  id: number;
}

export interface ChainLink {
  evolves_to: ChainLink[];
  species: Specie;
}

interface Specie {
  name: string;
  url: string;
}

export function getEvolution(url: string): Promise<EvolutionChain> {
  return fetch(url).then((res) => res.json());
}
