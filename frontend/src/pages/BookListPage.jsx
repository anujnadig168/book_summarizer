import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import bookApi from '../api/bookApi';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Memoizing loadBooks with useCallback to prevent unnecessary re-creations
  const loadBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const response = await bookApi.getBooks(searchTerm, currentPage);
      setBooks(response.results || []);
      
      // Calculate total pages from response data
      const total = response.count || 0;
      const perPage = 20; // API default
      setTotalPages(Math.ceil(total / perPage));
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading books:', err);
      setLoading(false);
      
      // Provide more specific error messages based on the error
      if (err.message && err.message.includes('Network Error')) {
        setError(
          'Cannot connect to the book server. Please make sure the backend is running at http://localhost:8000.'
        );
      } else if (err.response && err.response.status === 404) {
        setError('Book service endpoint not found. Please check API configuration.');
      } else if (err.response && err.response.status === 500) {
        setError('Book server encountered an error. Please try again later.');
      } else {
        setError('Failed to load books. Please try again later.');
      }
    }
  }, [searchTerm, currentPage]); // Dependencies of loadBooks

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    loadBooks();
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Call loadBooks when component mounts or when currentPage changes
  useEffect(() => {
    loadBooks();
  }, [loadBooks]); // Now we only need loadBooks as a dependency since it includes currentPage

  return (
    <div style={{ marginLeft: '40px', marginRight: '40px' }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Books</h1>
      
      {/* Search form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search books by title, author..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 border"
          />
          <button
            type="submit"
            style={{ width: '100px', minWidth: '100px', height: '35px', minHeight: '35px' }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </form>
      
      {/* Error display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Loading indicator */}
      {loading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {/* Book list */}
          {books.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No books found. Try another search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {book.formats && book.formats['image/jpeg'] ? (
                      <img
                        src={book.formats['image/jpeg']}
                        alt={book.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400">No Image</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                      {book.authors && book.authors.length > 0
                        ? book.authors.map((author) => author.name).join(', ')
                        : 'Unknown Author'}
                    </p>
                    <Link
                      to={`/books/${book.id}`}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border ${
                    currentPage === 1
                      ? 'text-gray-400 border-gray-200'
                      : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded border ${
                    currentPage === totalPages
                      ? 'text-gray-400 border-gray-200'
                      : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookListPage;
