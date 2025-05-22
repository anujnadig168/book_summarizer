import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="flex flex-col items-center">
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#9ca3af' }}>BookSummarizer</h3>
            <p style={{ color: '#9ca3af' }}>
              Summarize books with the power of AI
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button 
              style={{ color: '#9ca3af', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              onClick={() => console.log('Privacy Policy clicked')}
            >
              Privacy Policy
            </button>
            <button 
              style={{ color: '#9ca3af', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              onClick={() => console.log('Terms of Service clicked')}
            >
              Terms of Service
            </button>
            <button 
              style={{ color: '#9ca3af', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              onClick={() => console.log('Contact clicked')}
            >
              Contact
            </button>
          </div>
        </div>
        <div style={{ marginTop: '2rem', borderTop: '1px solid #374151', paddingTop: '1rem', textAlign: 'center', color: '#9ca3af' }}>
          <p>&copy; {new Date().getFullYear()} BookSummarizer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
