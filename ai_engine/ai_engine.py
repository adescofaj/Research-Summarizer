from fastapi import HTTPException
from models import SummaryOptions
from openai import OpenAI

class AIEngine:
    def __init__(self, api_key: str):
        self.client = OpenAI(api_key=api_key)
    
    async def generate_summary(self, text: str, options: SummaryOptions) -> str:
        """Generate summary using OpenAI GPT-4o-mini"""
        try:
            prompt = self._build_summary_prompt(text, options)
            
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are an expert research paper summarizer. Provide clear, accurate, and well-structured summaries."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=2000,
                temperature=0.3
            )
            
            return response.choices[0].message.content.strip()
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error generating summary: {str(e)}")
    
    def _build_summary_prompt(self, text: str, options: SummaryOptions) -> str:
        """Build prompt for summarization based on options"""
        
        # Summary type instructions
        type_instructions = {
            "concise": "Provide a concise overview focusing on the main findings and conclusions.",
            "detailed": "Provide a detailed analysis covering methodology, findings, and implications.",
            "bullet": "Present the summary as clear bullet points with each point on a separate line. Use simple bullet format (• or -) with concise statements, not long paragraphs.",
            "executive": "Create an executive summary suitable for decision-makers and stakeholders."
        }
        
        type_instruction = type_instructions.get(options.type, "Provide a comprehensive summary.")
        
        # Build the prompt
        prompt = f"""You are an expert research paper summarizer. Please analyze the following research paper and create a summary.

Summary Requirements:
- Type: {type_instruction}
- Target length: Approximately {options.length} characters
- Focus sections: {options.sections if options.sections else "All sections"}

Please provide a well-structured summary that captures the essential information from the research paper.

Research Paper Content:
{text}

Summary:"""
        
        if options.type == "bullet":
            prompt += "\n\nFormat your response as bullet points with each point on a new line. Keep each bullet point concise (1-2 sentences maximum)."

        return prompt