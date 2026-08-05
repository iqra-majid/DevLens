from collections import Counter

from app.schemas.repository import Repository


def analyze_repositories(repositories: list[Repository]):
    language_counter = Counter()

    for repo in repositories:
        if repo.language:
            language_counter[repo.language] += 1

    top_languages = language_counter.most_common(3)

    return {
        "total_repositories": len(repositories),
        "top_languages": top_languages,
    }