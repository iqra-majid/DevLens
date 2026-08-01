# pyrefly: ignore [missing-import]
from fastapi import APIRouter

# Import github service
from app.services.github_service import analyze_profile

from app.schemas.github import GitHubProfile

router = APIRouter()


@router.get(
    "/github/{username}",
    response_model=GitHubProfile
)
def analyze_github_profile(username: str) -> GitHubProfile:
    return analyze_profile(username)