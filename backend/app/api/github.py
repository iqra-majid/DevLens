# pyrefly: ignore [missing-import]
from fastapi import APIRouter

# Import github service
from app.services.github_service import analyze_profile

router = APIRouter()


@router.get("/github/{username}")
def analyze_github_profile(username: str):
    return analyze_profile(username)