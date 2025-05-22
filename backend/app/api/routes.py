from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Dict, List, Optional
from app.services.book_service import BookService
from app.services.llm_service import LLMService


MAX_CHARS_PER_PAGE = 3000


router = APIRouter(prefix="/api")

class SummarizeRequest(BaseModel):
    book_id: int
    page_number: int
    text_url: Optional[str] = None

class SummaryResponse(BaseModel):
    summary: str
    book_title: str
    author: str
    page_number: int
    original_text: str

@router.get("/books")
async def get_books(
    search: Optional[str] = None, 
    page: int = Query(1, ge=1), 
    limit: int = Query(20, ge=1, le=50)
):
    """Get a list of books from Project Gutenberg"""
    try:
        return await BookService.get_books(search_query=search, page=page, limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching books: {str(e)}")

@router.get("/books/{book_id}")
async def get_book(book_id: int):
    """Get details for a specific book"""
    try:
        return await BookService.get_book_by_id(book_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Book not found: {str(e)}")

@router.post("/summarize", response_model=SummaryResponse)
async def summarize_book(request: SummarizeRequest):
    """Summarize a book up to a specified page"""
    try:
        # Get book details
        book_data = await BookService.get_book_by_id(request.book_id)
        
        # Find text URL if not provided
        text_url = request.text_url
        if not text_url:
            # Try to find a text/plain format in the book formats
            formats = book_data.get("formats", {})
            for format_type, url in formats.items():
                if "text/plain" in format_type:
                    text_url = url
                    break
            
            if not text_url:
                raise HTTPException(status_code=400, detail="No plain text format available for this book")
        
        # Download book text
        book_text = BookService.download_book_text(text_url)

        # Add page numbers to book_text
        pagified_book_text = BookService.paginate_text(book_text, max_chars_per_page=MAX_CHARS_PER_PAGE)
        
        # Extract text up to the specified page and generate summary for that text using LLM
        llm_service = LLMService()

        # Get page number of first important text
        page_number_response = llm_service.get_page_number(pagified_book_text)
        
        # Parse the page number from the LLM response
        import re
        page_match = re.search(r'Page\s*(\d+)', page_number_response)
        if page_match:
            first_page_of_important_text = int(page_match.group(1))
        else:
            # Default to page 1 if we can't parse the page number
            first_page_of_important_text = 1

        # Extract only the important text
        text_to_summarize = BookService.extract_text_to_page(pagified_book_text, first_page_of_important_text, MAX_CHARS_PER_PAGE, request.page_number)

        # Generate summary
        summary = llm_service.summarize_text(text_to_summarize)
        
        return SummaryResponse(
            summary=summary,
            book_title=book_data.get("title", "Unknown"),
            author=book_data.get("authors", [{"name": "Unknown"}])[0].get("name", "Unknown"),
            page_number=request.page_number,
            original_text=text_to_summarize
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating summary: {str(e)}")
