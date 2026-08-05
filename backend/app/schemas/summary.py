# pyrefly: ignore [missing-import]
from pydantic import BaseModel


class SummaryResponse(BaseModel):
    summary: str