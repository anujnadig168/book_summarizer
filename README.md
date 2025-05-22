# Book Summarization Web Application

A web application that allows users to select books from open sources, specify a page number, and get an AI-generated summary of the book up to that page.

## Features

- Browse and search for books from Project Gutenberg
- View book details including author, language, and subjects
- Generate AI-powered summaries up to a specified page
- Modern, responsive UI built with React

## Project Structure

```
personal_app/book_summarizer/
├── frontend/          # React frontend application
├── backend/           # Python/FastAPI backend application
├── docs/              # Documentation files
└── README.md          # This file
```

## Setup and Installation

### Prerequisites

- Python 3.11 or higher
- Node.js and npm
- OpenAI API Key

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies using Poetry:
   ```
   poetry install
   ```
   Note: If you encounter issues with Poetry installation, make sure the README.md file exists in the backend directory.

3. Create a `.env` file based on the `.env.template`:
   ```
   cp .env.template .env
   ```

4. Edit the `.env` file and add your OpenAI API key.

5. Start the backend server:
   ```
   poetry run uvicorn app.main:app --reload --port 8000
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. If you encounter PostCSS issues during startup, install PostCSS v8:
   ```
   npm install --save postcss@8.4.31
   ```

4. Start the development server:
   ```
   npm start
   ```

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Browse the available books or search for a specific book
3. Select a book to view its details
4. Enter the page number up to which you want the book summarized
5. Click "Generate Summary" to get an AI-powered summary

## Testing

### Backend Tests

Run the backend tests using pytest as specified in the project requirements:

```
cd backend
poetry install
poetry run pytest
```

## Technologies Used

- **Frontend**: React, React Router
- **Backend**: Python, FastAPI, Poetry (as specified in project requirements)
- **AI**: OpenAI API
- **Data Source**: Project Gutenberg API
- **Testing**: pytest (as specified in project requirements)

## Troubleshooting

### Backend Issues

- If you get a "README.md not found" error during Poetry installation, create an empty README.md file in the backend directory.
- If the backend server fails to start with an "Address already in use" error, try changing the port number in the command.

### Frontend Issues

- If you encounter PostCSS or Tailwind CSS configuration issues, ensure you have PostCSS v8 installed.

## License

This project is for personal use only.
