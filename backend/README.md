# Book Summarizer Backend

FastAPI backend for the Book Summarization Web Application.

## Getting Started

1. Install dependencies:
```
poetry install
```

2. Run the application:
```
poetry run uvicorn app.main:app --reload --port 8000
```

## Testing

To run tests:
```
poetry run pytest
```

## API Endpoints

- `GET /health`: Health check endpoint
- `GET /api/books`: Get a list of books
- `GET /api/books/{book_id}`: Get details for a specific book
- `POST /api/summarize`: Generate a summary for a book
