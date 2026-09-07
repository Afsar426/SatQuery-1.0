from fastapi import HTTPException, status

class QueryService:
    @staticmethod
    def validate_query(query: str) -> str:
        """
        Validates the natural language query.
        Supports any human language (English, Hindi, Hinglish, etc.).
        """
        if not query or not query.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Please provide a natural language question about the image."
            )
        
        cleaned = query.strip()
        if len(cleaned) > 1000:
            cleaned = cleaned[:1000]
            
        return cleaned
