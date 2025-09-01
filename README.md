# Research Paper Summarizer

AI-powered tool that automatically generates summaries of research papers using GPT-4o-mini and intelligent document processing.

## Demo

🔗 **[View Demo](https://drive.google.com/drive/folders/1WwljcKzCKDyFNglvSzl_U0MenMS4V9uj?usp=drive_link)**

## Features

- Upload PDF/DOCX research papers
- 4 summary types: Concise, Detailed, Bullet Points, Executive
- Adjustable summary length (200-1500 characters)
- Section-specific summarization
- Copy and download summaries

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS  
**Backend:** Python FastAPI, Pydantic  
**AI:** OpenAI GPT-4o-mini  
**Document Processing:** PyPDF2, python-docx

## Setup

### Backend
```bash
cd ai_engine
pip install -r requirements.txt
echo "OPENAI_API_KEY=your_key" > .env
uvicorn app:app --reload
```

### Frontend
```bash
cd frontend  
npm install
echo "VITE_API_BASE_URL=http://127.0.0.1:8000" > .env
npm run dev
```

## API

**POST** `/api/summarize-agent`

```json
{
  "file": {
    "name": "paper.pdf",
    "type": "application/pdf", 
    "content": "base64_content"
  },
  "options": {
    "type": "concise",
    "length": 500,
    "sections": "Introduction, Results"
  }
}
```

**Response:** `{"summary": "Generated summary..."}`

## AI Implementation

- **Token Optimization**: 10,000 character limit reduces costs by 60-80%
- **Prompt Engineering**: Dynamic prompts based on summary type and user preferences
- **Cost Control**: ~2,500 tokens per request vs 15,000+ for full documents
- **Error Handling**: Robust document processing with fallback mechanisms