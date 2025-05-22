import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <div className="container" style={{ padding: '2rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={{ padding: '2rem 0' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
                Summarize any book with AI
              </h1>
              <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: '#6b7280' }}>
                Select books from our library, specify a page number, and get instant AI-generated summaries. 
                Perfect for research, study, or when you need to quickly understand a book's content.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link
                  to="/books"
                  className="btn"
                >
                  Browse Books
                </Link>
                <Link to="/about" style={{ fontWeight: '600', color: '#111827', textDecoration: 'none' }}>
                  Learn more <span>→</span>
                </Link>
              </div>
            </div>
          </div>
          <div style={{ padding: '1rem' }}>
            <div>
              <img 
                src={ require('/home/anuj/book_summarizer/frontend/src/homepage_book.jpg') }
                width={450} height={450}
                alt="book"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
