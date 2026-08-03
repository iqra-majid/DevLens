# pyrefly: ignore [missing-import]
from pydantic import BaseModel


class GitHubProfile(BaseModel):
    username: str
    name: str | None
    bio: str | None
    avatar_url: str
    public_repos: int
    followers: int
    following: int
    created_at: str