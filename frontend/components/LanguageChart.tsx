import React, { useMemo } from "react";
import { Repository } from "./RepositoryList";

// Map programming languages to color codes
const languageColors: { [key: string]: string } = {
  typescript: "#3b82f6", // blue-500
  javascript: "#eab308", // yellow-500
  python: "#10b981",     // emerald-500
  go: "#06b6d4",         // cyan-500
  rust: "#f97316",       // orange-500
  html: "#ef4444",       // red-500
  css: "#a855f7",        // purple-500
  react: "#38bdf8",      // sky-400
  "next.js": "#171717",  // neutral-900 (light mode focus)
};

interface LanguageChartProps {
  repositories: Repository[];
}

export default function LanguageChart({ repositories }: LanguageChartProps) {
  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    let total = 0;

    repositories.forEach((repo) => {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1;
        total++;
      }
    });

    if (total === 0) return [];

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: (count / total) * 100,
        // Default to a neutral gray for unrecognized languages
        color: languageColors[name.toLowerCase()] || "#9ca3af",
      }))
      .sort((a, b) => b.count - a.count);
  }, [repositories]);

  if (stats.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl mt-12 bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-xl shadow-zinc-100 dark:shadow-none transition-all duration-300">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
        Top Languages
      </h2>
      
      {/* Stacked Bar */}
      <div className="flex w-full h-3 rounded-full overflow-hidden mb-6 bg-zinc-100 dark:bg-zinc-900">
        {stats.map((stat) => (
          <div 
            key={stat.name}
            style={{ width: `${stat.percentage}%`, backgroundColor: stat.color }}
            className="h-full transition-all duration-500 hover:opacity-80 cursor-pointer"
            title={`${stat.name}: ${stat.percentage.toFixed(1)}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full shadow-sm" 
              style={{ backgroundColor: stat.color }}
            />
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {stat.name}
            </span>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {stat.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
