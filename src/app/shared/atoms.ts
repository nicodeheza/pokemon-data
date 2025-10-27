"use client";

import { atom } from "jotai";
import type { PokemonQueryParams } from "../services/pokemonList.types";

export const lastFiltersAtom = atom<PokemonQueryParams>({});
