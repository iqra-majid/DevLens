import React from "react";

export interface GitHubProfile {
  username: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  company: string | null;
  blog: string | null;
  created_at: string;
}

interface ProfileCardProps {
  profile: GitHubProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  // Safe date formatter to avoid SSR locale hydration mismatches
  const formatMemberSince = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
    } catch {
      return "N/A";
    }
  };

  // Clean blog url helper
  const getBlogLink = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className="mx-auto max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-xl shadow-zinc-100 dark:shadow-none transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={profile.avatar_url}
          alt={`${profile.name || profile.username}'s avatar`}
          className="w-24 h-24 rounded-2xl object-cover border border-zinc-200/80 dark:border-zinc-800 shadow-sm"
        />
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {profile.name || profile.username}
            </h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1">
              <a
                href={`https://github.com/${profile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm inline-flex items-center gap-1"
              >
                @{profile.username}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <span className="text-xs text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-xs inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Joined {formatMemberSince(profile.created_at)}
              </span>
            </div>
          </div>
          
          {profile.bio && (
            <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed max-w-md italic">
              "{profile.bio}"
            </p>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 text-center">
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100/50 dark:border-zinc-900/50 hover:scale-[1.02] transition-transform">
          <span className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Repositories
          </span>
          <span className="block text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">
            {profile.public_repos}
          </span>
        </div>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100/50 dark:border-zinc-900/50 hover:scale-[1.02] transition-transform">
          <span className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Followers
          </span>
          <span className="block text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">
            {profile.followers}
          </span>
        </div>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100/50 dark:border-zinc-900/50 hover:scale-[1.02] transition-transform">
          <span className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Following
          </span>
          <span className="block text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">
            {profile.following}
          </span>
        </div>
      </div>

      {/* Detailed Meta Information List */}
      <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4 text-center sm:text-left">
          Additional Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {/* Location */}
          <div className="flex items-center gap-3 text-zinc-650 dark:text-zinc-350">
            <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900 text-zinc-400 dark:text-zinc-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <span className="block text-xs text-zinc-400 dark:text-zinc-500 font-medium">Location</span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {profile.location || "Not specified"}
              </span>
            </div>
          </div>

          {/* Company */}
          <div className="flex items-center gap-3 text-zinc-650 dark:text-zinc-350">
            <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900 text-zinc-400 dark:text-zinc-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <span className="block text-xs text-zinc-400 dark:text-zinc-500 font-medium">Company</span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {profile.company || "Not specified"}
              </span>
            </div>
          </div>

          {/* Blog/Website */}
          <div className="flex items-center gap-3 text-zinc-650 dark:text-zinc-350 sm:col-span-2">
            <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900 text-zinc-400 dark:text-zinc-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div className="truncate">
              <span className="block text-xs text-zinc-400 dark:text-zinc-500 font-medium">Website / Blog</span>
              {profile.blog ? (
                <a
                  href={getBlogLink(profile.blog)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline truncate block max-w-md"
                >
                  {profile.blog}
                </a>
              ) : (
                <span className="font-medium text-zinc-800 dark:text-zinc-200">Not specified</span>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
