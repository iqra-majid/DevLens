# pyrefly: ignore [missing-import]
from pydantic import BaseModel


class Repository(BaseModel):
    name: str
    description: str | None
    language: str | None
    stargazers_count: int
    forks_count: int
    html_url: str
    open_issues_count: int
    updated_at: str