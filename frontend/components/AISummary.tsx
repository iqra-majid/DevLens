import React from "react";
import { GitHubProfile } from "./ProfileCard";

interface AISummaryProps {
    profile: GitHubProfile;
}

export default function AISummary({ profile }: AISummaryProps) {
    return (
        <div className="mx-auto max-w-5xl mt-12 relative rounded-3xl p-[2px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/10 transition-all duration-300 hover:shadow-purple-500/20">
            <div className="bg-white dark:bg-zinc-950 rounded-[22px] p-6 md:p-8 h-full w-full">
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-md shadow-indigo-500/20">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.75"
                                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 dark:from-indigo-400 dark:to-pink-400">
                        AI Insights
                    </h2>
                </div>

                <div className="text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-4 text-[15px]">
                    <p>
                        Based on the analysis of <strong>{profile.name || profile.username}</strong>'s GitHub footprint, this developer demonstrates a strong focus on modern engineering practices and consistent code shipping. With {profile.public_repos} public repositories, they exhibit a healthy capacity for maintaining both personal and open-source projects.
                    </p>
                    <p>
                        Their network graph—featuring {profile.followers} followers—highlights active engagement within the developer community. The technology spread suggests a specialization in building scalable web architectures and robust tooling.
                    </p>
                </div>
            </div>
        </div>
    );
}
