# pyrefly: ignore [missing-import]
from fastapi import APIRouter

# Import github service
from app.services.github_service import (analyze_profile, get_repositories, github_summary)
from app.schemas.summary import SummaryResponse

from app.schemas.github import GitHubProfile
from app.schemas.repository import Repository

router = APIRouter()


@router.get(
    "/github/{username}",
    response_model=GitHubProfile
)
def analyze_github_profile(username: str) -> GitHubProfile:
    return analyze_profile(username)

@router.get(
    "/github/{username}/repositories",
    response_model=list[Repository],
)
def github_repositories(username: str):
    return get_repositories(username)

@router.post(
    "/github/{username}/summary",
    response_model=SummaryResponse,
)
def github_summary(username: str):
    return github_summary(username)
    