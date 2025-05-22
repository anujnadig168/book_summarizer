import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookApi from '../api/bookApi';

const BookDetailPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(20);
  const [summarizing, setSummarizing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [originalText, setOriginalText] = useState(null);

  useEffect(() => {
    const loadBookDetails = async () => {
      try {
        setLoading(true);
        const bookData = await bookApi.getBookById(bookId);
        setBook(bookData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load book details. Please try again later.');
        setLoading(false);
        console.error('Error loading book details:', err);
      }
    };

    loadBookDetails();
  }, [bookId]);

  const handlePageNumberChange = (e) => {
    setPageNumber(parseInt(e.target.value) || 1);
  };

  const handleSummarize = async () => {
    try {
      setSummarizing(true);
      setSummary(null);
      setOriginalText(null);
      
      // Find text URL if available
      let textUrl = null;
      if (book && book.formats) {
        for (const [format, url] of Object.entries(book.formats)) {
          if (format.includes('text/plain')) {
            textUrl = url;
            break;
          }
        }
      }
      
      const summaryData = await bookApi.summarizeBook(bookId, pageNumber, textUrl);
      setSummary(summaryData);
      
      // Store the original text if it's provided in the response
      if (summaryData.original_text) {
        setOriginalText(summaryData.original_text);
      }
      
      setSummarizing(false);
    } catch (err) {
      setError('Failed to generate summary. Please try again later.');
      setSummarizing(false);
      console.error('Error generating summary:', err);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center my-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-300 border-t-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={handleGoBack}
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <span>← Back to books</span>
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-8">
          <p className="text-gray-500">Book not found.</p>
        </div>
        <button
          onClick={handleGoBack}
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <span>← Back to books</span>
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: '40px' }} className="max-w-4xl mx-auto px-8 sm:px-10 lg:px-12 py-8">
      <button
        onClick={handleGoBack}
        className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-6"
      >
        <span>← Back to books</span>
      </button>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-8 py-6 sm:px-10">
          <div className="flex flex-col md:flex-row">
            <div className="flex-grow">
              <h3 className="text-2xl font-bold leading-6 text-gray-900">{book.title}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {book.authors && book.authors.length > 0
                  ? book.authors.map((author) => author.name).join(', ')
                  : 'Unknown Author'}
              </p>
            </div>
            {book.formats && book.formats['image/jpeg'] && (
              <div className="mt-4 md:mt-0 flex justify-center">
                <img
                  src={book.formats['image/jpeg']}
                  alt={book.title}
                  className="h-48 w-auto object-cover shadow-md rounded-md"
                />
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200 px-8 py-6 sm:px-10">
          <div className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="pageNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter the page number up to which you want the book summarized:
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="pageNumber"
                  id="pageNumber"
                  value={pageNumber}
                  onChange={handlePageNumberChange}
                  min="1"
                  max="5000"
                  style={{ width: '50px' }}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <div>
                <button
                  onClick={handleSummarize}
                  disabled={summarizing}
                  style={{ width: '150px', minWidth: '100px', height: '35px', minHeight: '35px' }}
                  className={`inline-flex justify-center items-center rounded-md border border-transparent shadow-md px-10 py-2 text-sm font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                    summarizing
                      ? 'bg-teal-400 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-700'
                  }`}
              >
                {summarizing ? (
                  <div className="flex items-center justify-center w-full">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="ml-2">Creating AI Summary</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <span className="mr-5">✨</span>
                    <span>Generate Summary</span>
                  </div>
                )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Original Text Content Section */}
      {originalText && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Original Text Content (Used for Summarization)
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Text excerpt from "{book.title}" up to page {pageNumber}
            </p>
          </div>
          <div className="border-t border-gray-200 px-8 py-6 sm:px-10">
            <div className="max-h-80 overflow-y-auto mb-4">
              <p className="text-gray-700 whitespace-pre-line text-sm">{originalText}</p>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              <em>Note: Text begins from Chapter 1, excluding front matter.</em>
            </div>
          </div>
        </div>
      )}

      {/* Summary section */}
      {summary && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Summary up to page {summary.page_number}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              AI-generated summary of "{summary.book_title}" by {summary.author}
            </p>
          </div>
          <div className="border-t border-gray-200 px-8 py-6 sm:px-10">
            <p className="text-gray-700 whitespace-pre-line">{summary.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;
