from pydantic import BaseModel
from typing import Optional

class FileData(BaseModel):
    name: str
    type: str
    content: str  # base64 encoded

class SummaryOptions(BaseModel):
    type: str
    length: int
    sections: Optional[str] = ""

class SummaryRequest(BaseModel):
    file: FileData
    options: SummaryOptions

class SummaryResponse(BaseModel):
    summary: str