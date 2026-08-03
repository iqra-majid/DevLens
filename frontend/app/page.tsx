"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import ProfileCard, { GitHubProfile } from "@/components/ProfileCard";
import AISummary from "@/components/AISummary";
import RepositoryList, { Repository } from "@/components/RepositoryList";
import LanguageChart from "@/components/LanguageChart";

const dummyProfile: GitHubProfile = {
  username: "devlens-analyzer",
  name: "DevLens Analyzer",
  bio: "A premium open-source tool for analyzing GitHub repositories, contributor statistics, commit metrics, and developer patterns.",
  avatar_url: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=250&auto=format&fit=crop",
  public_repos: 42,
  followers: 1337,
  following: 88,
  location: "San Francisco, CA",
  company: "DevLens Inc.",
  blog: "devlens-analyzer.dev",
  created_at: "2024-01-01T00:00:00Z"
};

const dummyRepos: Repository[] = [
  {
    name: "DevLens",
    description: "A premium open-source tool for analyzing GitHub repositories, contributor statistics, commit metrics, and developer patterns.",
    language: "TypeScript",
    stargazers_count: 120,
    forks_count: 32,
    open_issues_count: 5,
    updated_at: "2026-08-01T12:00:00Z",
    html_url: "https://github.com"
  },
  {
    name: "Portfolio",
    description: "Personal portfolio website built with React and Tailwind CSS featuring smooth transitions and dark mode support.",
    language: "React",
    stargazers_count: 15,
    forks_count: 2,
    open_issues_count: 0,
    updated_at: "2026-08-03T10:00:00Z",
    html_url: "https://github.com"
  },
  {
    name: "AI Chat",
    description: "Real-time AI chatbot application integrated with OpenAI GPT-4 and custom document context retrieval system.",
    language: "Python",
    stargazers_count: 98,
    forks_count: 14,
    open_issues_count: 3,
    updated_at: "2026-07-29T15:30:00Z",
    html_url: "https://github.com"
  },
  {
    name: "Blog",
    description: "A static blogging platform using Next.js and MDX with fully responsive design and optimized SEO tags.",
    language: "Next.js",
    stargazers_count: 40,
    forks_count: 7,
    open_issues_count: 1,
    updated_at: "2026-07-27T09:15:00Z",
    html_url: "https://github.com"
  }
];

export default function Home() {
  const [profile, setProfile] = useState<GitHubProfile | null>(dummyProfile);
  const [repos, setRepos] = useState<Repository[]>(dummyRepos);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    setError(null);
    setProfile(null);
    setRepos([]);

    try {
      // Fetch Profile from backend API
      const response = await fetch(`http://localhost:8000/github/${username}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("GitHub user not found. Please try another username.");
        }
        throw new Error("Failed to fetch profile data from backend. Please try again.");
      }
      const data = await response.json();
      const mappedProfile: GitHubProfile = {
        username: data.username, // Backend returns 'username', not 'login'
        name: data.name,
        bio: data.bio,
        avatar_url: data.avatar_url,
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        location: data.location || null,
        company: data.company || null,
        blog: data.blog || null,
        created_at: data.created_at || new Date().toISOString(), // Fallback if backend doesn't provide
      };
      setProfile(mappedProfile);

      // Fetch Repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
      if (reposResponse.ok) {
        const reposData = await reposResponse.json();
        const mappedRepos: Repository[] = reposData.map((repo: any) => ({
          name: repo.name,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          open_issues_count: repo.open_issues_count,
          updated_at: repo.updated_at,
          html_url: repo.html_url,
        }));
        setRepos(mappedRepos);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">DevLens</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
            Analyze your GitHub profile, repository metrics, and developer activity with instant, detailed insights.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-16">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Error State */}
        {error && (
          <div className="mx-auto max-w-2xl p-4 mb-8 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl flex items-start gap-3 text-red-700 dark:text-red-300 animate-fade-in">
            <svg
              className="w-5 h-5 mt-0.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-sm">Error</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {profile && (
          <div className="space-y-12">
            <ProfileCard profile={profile} />
            <AISummary profile={profile} />
            <LanguageChart repositories={repos} />
            <RepositoryList repositories={repos} />
          </div>
        )}
      </main>
    </div>
  );
}



