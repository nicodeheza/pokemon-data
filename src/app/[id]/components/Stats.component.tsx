import type { FC } from "react";
import type { Stat as StatType } from "~/types/pokemon.types";

interface Props {
  stats: StatType[];
}

export const Stats: FC<Props> = ({ stats }) => {
  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-xl">
      <Header />
      <div className="p-6">
        <div className="space-y-4">
          {stats.map((stat) => (
            <Stat key={stat.name} stat={stat} />
          ))}
        </div>
        <Total stats={stats} />
      </div>
    </div>
  );
};

const Header: FC = () => {
  return (
    <div className="border-b bg-indigo-500 px-6 py-4">
      <h2 className="text-2xl font-bold text-white">Base Stats</h2>
    </div>
  );
};

interface StatProps {
  stat: StatType;
}

const Stat: FC<StatProps> = ({ stat }) => {
  const maxStat = 255;
  const percentage = (stat.base / maxStat) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="min-w-[120px] text-sm font-semibold text-gray-700 capitalize">
          {stat.name.replace("-", " ")}
        </span>
        <span className="text-sm font-bold text-gray-900">{stat.base}</span>
        <span className="text-xs text-gray-500">(EV: {stat.effort})</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

interface TotalProps {
  stats: StatType[];
}

const Total: FC<TotalProps> = ({ stats }) => {
  return (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <div className="flex justify-between">
        <span className="text-lg font-bold text-gray-700">Total</span>
        <span className="text-lg font-bold text-indigo-600">
          {stats.reduce((sum, stat) => sum + stat.base, 0)}
        </span>
      </div>
    </div>
  );
};
