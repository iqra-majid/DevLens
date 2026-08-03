import React, { useState } from "react";

export interface Repository {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  html_url: string;
}

interface RepositoryListProps {
  repositories: Repository[];
}

// Map programming languages to color codes for a premium look
const languageColors: { [key: string]: string } = {
  typescript: "bg-blue-500 text-blue-500",
  javascript: "bg-yellow-500 text-yellow-500",
  python: "bg-emerald-500 text-emerald-500",
  go: "bg-cyan-500 text-cyan-500",
  rust: "bg-orange-500 text-orange-500",
  html: "bg-red-500 text-red-500",
  css: "bg-purple-500 text-purple-500",
  react: "bg-sky-400 text-sky-400",
  "next.js": "bg-neutral-800 text-neutral-800 dark:bg-neutral-200 dark:text-neutral-200",
};

export default function RepositoryList({ repositories }: RepositoryListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const formatRelativeTime = (isoString: string) => {
    try {
      const now = new Date();
      const updated = new Date(isoString);
      const diffMs = Math.abs(now.getTime() - updated.getTime());
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 60) return "Just now";
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
      }
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } catch {
      return "N/A";
    }
  };

  const filteredRepos = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description &&
        repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-5xl mt-12 bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-xl shadow-zinc-100 dark:shadow-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-900">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Repositories
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Showing {filteredRepos.length} of {repositories.length} repositories
          </p>
        </div>

        {/* Repository Search */}
        <div className="relative max-w-sm w-full">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-450 dark:text-zinc-500 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Repository..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-zinc-900 dark:text-zinc-50 placeholder-zinc-400"
          />
        </div>
      </div>

      {filteredRepos.length === 0 ? (
        <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
          No repositories match your search term.
        </div>
      ) : (
        <div className="overflow-x-auto -mx-6 md:-mx-8">
          <div className="inline-block min-w-full align-middle px-6 md:px-8">
            <table className="min-w-full divide-y divide-zinc-150 dark:divide-zinc-900">
              <thead>
                <tr className="text-left text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  <th scope="col" className="pb-3 w-1/3">Repo Name</th>
                  <th scope="col" className="pb-3">Language</th>
                  <th scope="col" className="pb-3 text-center">Stars</th>
                  <th scope="col" className="pb-3 text-center">Forks</th>
                  <th scope="col" className="pb-3 text-center">Issues</th>
                  <th scope="col" className="pb-3 text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900/50">
                {filteredRepos.map((repo) => {
                  const langLower = repo.language?.toLowerCase() || "";
                  const dotColor = languageColors[langLower] || "bg-zinc-400 text-zinc-400";

                  return (
                    <tr
                      key={repo.name}
                      className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-all"
                    >
                      {/* Name & Description */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex items-center gap-1"
                          >
                            {repo.name}
                            <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                        {repo.description && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 max-w-sm font-normal">
                            {repo.description}
                          </p>
                        )}
                      </td>

                      {/* Language */}
                      <td className="py-4 text-sm font-medium text-zinc-650 dark:text-zinc-350">
                        {repo.language ? (
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${dotColor.split(" ")[0]}`} />
                            <span>{repo.language}</span>
                          </div>
                        ) : (
                          <span className="text-zinc-400 dark:text-zinc-600">—</span>
                        )}
                      </td>

                      {/* Stars */}
                      <td className="py-4 text-center text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        <span className="inline-flex items-center gap-1 justify-center">
                          <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {repo.stargazers_count}
                        </span>
                      </td>

                      {/* Forks */}
                      <td className="py-4 text-center text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        <span className="inline-flex items-center gap-1 justify-center">
                          <svg className="w-4 h-4 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7a3 3 0 100-6 3 3 0 000 6zM8 7v7a4 4 0 00.245 1.379L10 18m0 0H8m2 0h2m-4-4l-1.755 3.51a1 1 0 00.895 1.49h1.72M16 7a3 3 0 100-6 3 3 0 000 6zM16 7v7a4 4 0 01-.245 1.379L14 18m0 0h2m-2 0h-2m4-4l1.755 3.51a1 1 0 01-.895 1.49H14.28" />
                          </svg>
                          {repo.forks_count}
                        </span>
                      </td>

                      {/* Open Issues */}
                      <td className="py-4 text-center text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        <span className="inline-flex items-center gap-1 justify-center">
                          <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          {repo.open_issues_count}
                        </span>
                      </td>

                      {/* Updated At */}
                      <td className="py-4 text-right text-sm text-zinc-555 dark:text-zinc-400 font-medium">
                        {formatRelativeTime(repo.updated_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
