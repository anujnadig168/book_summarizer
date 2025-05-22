import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <h1 style={{ color: '#ffffff' }}>BookSummarizer</h1>
            </Link>
            <nav>
              <Link to="/">
                Home
              </Link>
              <Link to="/books">
                Browse Books
              </Link>
              <Link to="/about">
                About
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
