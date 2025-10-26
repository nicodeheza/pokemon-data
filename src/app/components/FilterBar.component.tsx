"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, type FC } from "react";
import { Combobox, type ComboboxOption } from "~/components/Combobox.component";
import { Input } from "~/components/Input.component";
import { useReplaceSearchParams } from "~/hooks/useReplaceSearchParams.hook";
import type { Generations, PokemonTypes } from "~/types/pokemon.types";
import type { PokemonQueryParams } from "~/app/services/pokemonList.types";
import { cleanPokemonSearchObject } from "../services/pokemons.validations";
import { useDebounceEventHandler } from "~/hooks/useDebounceEventHandler.hook";

type Filters = Omit<PokemonQueryParams, "page">;

export const FilterBar: FC = () => {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters | undefined>();
  const replaceSearchParams = useReplaceSearchParams();

  const setNameParam = useDebounceEventHandler((name: string) => {
    replaceSearchParams("name", name);
  });

  useEffect(() => {
    if (!searchParams.size) return setFilters(undefined);
    const filters: Filters = cleanPokemonSearchObject(
      Object.fromEntries(searchParams.entries()),
    );
    setFilters(filters);
  }, [searchParams]);

  const updateFilter = (update: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
  };

  const onNameChange = (name: string) => {
    setNameParam(name);
    updateFilter({ name });
  };

  const onGenerationChange = (generation: GenerationOptions | undefined) => {
    const newGeneration = generation === "all" ? undefined : generation;
    replaceSearchParams("generation", newGeneration);
    updateFilter({ generation: newGeneration });
  };

  const onTypeChange = (type: TypeOptions | undefined) => {
    const newType = type === "all" ? undefined : type;
    replaceSearchParams("type", newType);
    updateFilter({ type: newType });
  };

  return (
    <div className="flex w-full max-w-5xl flex-col items-stretch justify-between gap-4 p-4 sm:gap-5 sm:p-6 md:p-8 xl:flex-row xl:items-center">
      <Input
        placeholder="Search by Pokémon name"
        className="w-full md:max-w-2xl xl:max-w-md"
        value={filters?.name ?? ""}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 md:gap-5">
        <Combobox
          placeholder="Search by generation"
          options={generationOptions}
          onValueChange={onGenerationChange}
          value={filters?.generation}
        />
        <Combobox
          placeholder="Search by type"
          options={typeOptions}
          onValueChange={onTypeChange}
          value={filters?.type}
        />
      </div>
    </div>
  );
};

type TypeOptions = PokemonTypes | "all";
type GenerationOptions = Generations | "all";

const typeOptions: ComboboxOption<TypeOptions>[] = [
  { label: "All", value: "all" },
  { label: "Normal", value: "normal" },
  { label: "Fighting", value: "fighting" },
  { label: "Flying", value: "flying" },
  { label: "Poison", value: "poison" },
  { label: "Ground", value: "ground" },
  { label: "Rock", value: "rock" },
  { label: "Bug", value: "bug" },
  { label: "Ghost", value: "ghost" },
  { label: "Steel", value: "steel" },
  { label: "Fire", value: "fire" },
  { label: "Water", value: "water" },
  { label: "Grass", value: "grass" },
  { label: "Electric", value: "electric" },
  { label: "Psychic", value: "psychic" },
  { label: "Ice", value: "ice" },
  { label: "Dragon", value: "dragon" },
  { label: "Dark", value: "dark" },
  { label: "Fairy", value: "fairy" },
  { label: "Stellar", value: "stellar" },
  { label: "Unknown", value: "unknown" },
];

const generationOptions: ComboboxOption<GenerationOptions>[] = [
  { label: "All", value: "all" },
  { label: "Generation I", value: "generation-i" },
  { label: "Generation II", value: "generation-ii" },
  { label: "Generation III", value: "generation-iii" },
  { label: "Generation IV", value: "generation-iv" },
  { label: "Generation V", value: "generation-v" },
  { label: "Generation VI", value: "generation-vi" },
  { label: "Generation VII", value: "generation-vii" },
  { label: "Generation VIII", value: "generation-viii" },
  { label: "Generation IX", value: "generation-ix" },
];
