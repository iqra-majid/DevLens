# pyrefly: ignore [missing-import]
import httpx

# pyrefly: ignore [missing-import]
from fastapi import HTTPException
from app.schemas.github import GitHubProfile


def analyze_profile(username: str):
    url = f"https://api.github.com/users/{username}"

    try:
        response = httpx.get(url, timeout=10)

    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="GitHub request timed out"
        )

    except httpx.RequestError:
        raise HTTPException(
            status_code=503,
            detail="Unable to connect to GitHub"
        )

    if response.status_code == 404:
        raise HTTPException(
            status_code=404,
            detail="GitHub user not found"
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="Failed to fetch data from GitHub"
        )

    data = response.json()

    return GitHubProfile(
        username=data["login"],
        name=data["name"],
        bio=data["bio"],
        avatar_url=data["avatar_url"],
        public_repos=data["public_repos"],
        followers=data["followers"],
        following=data["following"],
    )