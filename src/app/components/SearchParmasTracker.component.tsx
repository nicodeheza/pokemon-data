"use client";
import { useEffect, type FC } from "react";
import type { PokemonQueryParams } from "../services/pokemonList.types";
import { lastFiltersAtom } from "../shared/atoms";
import { useSetAtom } from "jotai";

interface Props {
  searchParams: PokemonQueryParams | undefined;
}
export const SearchParamsTracker: FC<Props> = ({ searchParams }) => {
  const setLastFilters = useSetAtom(lastFiltersAtom);
  useEffect(() => {
    setLastFilters(searchParams ?? {});
  }, [searchParams, setLastFilters]);

  return null;
};
