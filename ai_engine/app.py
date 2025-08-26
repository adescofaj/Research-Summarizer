from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import SummaryRequest, SummaryResponse
from services import SummarizerService
from dotenv import load_dotenv
load_dotenv()  # Add this line

# Initialize FastAPI app
app = FastAPI(title="Research Paper Summarizer", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
summarizer_service = SummarizerService()

# API Endpoints
@app.get("/")
async def root():
    return {"message": "Research Paper Summarizer API", "status": "running"}

@app.post("/api/summarize-agent", response_model=SummaryResponse)
async def summarize_document(request: SummaryRequest):
    """
    Summarize a research paper document
    """
    try:
        summary = await summarizer_service.process_document(request)
        return SummaryResponse(summary=summary)
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "summarizer-api"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)