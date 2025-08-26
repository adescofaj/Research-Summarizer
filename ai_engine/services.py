from fastapi import HTTPException
from models import SummaryRequest, FileData, SummaryOptions
from document_processor import DocumentProcessor
from ai_engine import AIEngine
import os

class SummarizerService:
    def __init__(self):
        self.document_processor = DocumentProcessor()
        self.ai_engine = AIEngine(api_key=os.getenv("OPENAI_API_KEY"))
    
    async def process_document(self, request: SummaryRequest) -> str:
        """
        Process document and generate summary
        """
        # Extract text from document
        extracted_text = self.document_processor.extract_text(request.file)
        
        # Validate extracted text
        if not extracted_text or len(extracted_text.strip()) < 100:
            raise HTTPException(status_code=400, detail="Document appears to be empty or too short")
        
        # Generate summary
        summary = await self.ai_engine.generate_summary(extracted_text, request.options)
        
        return summary