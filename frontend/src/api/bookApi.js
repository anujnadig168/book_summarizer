import axios from 'axios';

const API_URL = 'http://localhost:8000';

const bookApi = {
  /**
   * Get a list of books
   * @param {string} search - Optional search term
   * @param {number} page - Page number
   * @returns {Promise} Promise object with book list response
   */
  getBooks: async (search = '', page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/api/books`, {
        params: { search, page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  /**
   * Get a specific book by ID
   * @param {number} bookId - The ID of the book to fetch
   * @returns {Promise} Promise object with book details
   */
  getBookById: async (bookId) => {
    try {
      const response = await axios.get(`${API_URL}/api/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book ${bookId}:`, error);
      throw error;
    }
  },

  /**
   * Request a summary of a book up to a specific page
   * @param {number} bookId - The ID of the book
   * @param {number} pageNumber - The page number to summarize up to
   * @param {string} textUrl - Optional URL to the plain text version of the book
   * @returns {Promise} Promise object with summary response
   */
  summarizeBook: async (bookId, pageNumber, textUrl = null) => {
    try {
      const response = await axios.post(`${API_URL}/api/summarize`, {
        book_id: bookId,
        page_number: pageNumber,
        text_url: textUrl
      });
      return response.data;
    } catch (error) {
      console.error('Error summarizing book:', error);
      throw error;
    }
  }
};

export default bookApi;
