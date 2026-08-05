from app.services.analysis_service import analyze_repositories
from app.services.github_service import (
    analyze_profile,
    get_repositories,
)


def generate_summary(username: str):

    profile = analyze_profile(username)

    repositories = get_repositories(username)

    analysis = analyze_repositories(repositories)

    languages = ", ".join(
        language
        for language, _ in analysis["top_languages"]
    )

    summary = (
        f"{profile.name} primarily works with "
        f"{languages}. "
        f"They have {analysis['total_repositories']} public repositories "
        f"covering various software projects."
    )

    return summary