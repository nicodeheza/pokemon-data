"use client";
import { useAtomValue } from "jotai";
import Link from "next/link";
import type { FC } from "react";
import { lastFiltersAtom } from "~/app/shared/atoms";
import { objectToSearchParams } from "~/app/shared/utils/url.utils";

export const ReturnToList: FC = () => {
  const lastSearch = useAtomValue(lastFiltersAtom);
  return (
    <Link
      href={{
        pathname: "/",
        search: objectToSearchParams(lastSearch),
      }}
      className="rounded bg-blue-500 px-4 py-2 text-white transition hover:scale-105"
    >
      Go Back to List
    </Link>
  );
};
