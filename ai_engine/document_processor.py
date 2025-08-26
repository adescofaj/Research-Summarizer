from fastapi import HTTPException
from models import FileData
import base64
import io
import PyPDF2
from docx import Document

class DocumentProcessor:
    
    def extract_text(self, file_data: FileData) -> str:
        """Extract text from uploaded document"""
        file_bytes = self._decode_base64_file(file_data.content)
        
        if file_data.type == "application/pdf":
            text = self._extract_text_from_pdf(file_bytes)
        elif file_data.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            text = self._extract_text_from_docx(file_bytes)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
        # Limit to first 10,000 characters
        return self._limit_text_to_characters(text, 20000)
    
    def _limit_text_to_characters(self, text: str, max_chars: int = 20000) -> str:
        """Limit text to first N characters"""
        if len(text) <= max_chars:
            return text
        return text[:max_chars]
    
    def _decode_base64_file(self, base64_content: str) -> bytes:
        """Decode base64 file content"""
        try:
            # Remove data URL prefix if present
            if "," in base64_content:
                base64_content = base64_content.split(",")[1]
            return base64.b64decode(base64_content)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error decoding file: {str(e)}")
    
    def _extract_text_from_pdf(self, file_bytes: bytes) -> str:
        """Extract text from PDF bytes"""
        try:
            pdf_file = io.BytesIO(file_bytes)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            return text.strip()
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error processing PDF: {str(e)}")
    
    def _extract_text_from_docx(self, file_bytes: bytes) -> str:
        """Extract text from DOCX bytes"""
        try:
            docx_file = io.BytesIO(file_bytes)
            doc = Document(docx_file)
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text.strip()
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error processing DOCX: {str(e)}")