import React from 'react';

const AboutPage = () => {
  return (
    <div style={{ marginLeft: '40px' }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About BookSummarizer</h1>
        
        <div className="prose prose-indigo">
          <p className="text-lg text-gray-700 mb-4">
            BookSummarizer is a personal project designed to help readers quickly get 
            summaries of books using artificial intelligence.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">How It Works</h2>
          <p className="text-gray-700 mb-4">
            Our application leverages open-source book repositories and modern AI 
            language models to provide concise summaries of books up to any page you specify.
          </p>
          <ol className="list-decimal pl-5 space-y-2 mb-6">
            <li className="text-gray-700">Browse our collection of books from Project Gutenberg</li>
            <li className="text-gray-700">Select a book you're interested in</li>
            <li className="text-gray-700">Specify up to which page you want the summary</li>
            <li className="text-gray-700">Receive an AI-generated summary in seconds</li>
          </ol>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Technologies</h2>
          <p className="text-gray-700 mb-4">
            This application is built using:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li className="text-gray-700">React for the frontend</li>
            <li className="text-gray-700">Tailwind CSS for styling</li>
            <li className="text-gray-700">Python/FastAPI for the backend</li>
            <li className="text-gray-700">OpenAI's language models for summarization</li>
            <li className="text-gray-700">Project Gutenberg API for accessing books</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Limitations</h2>
          <p className="text-gray-700 mb-4">
            Please note that:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li className="text-gray-700">Summaries are AI-generated and may not capture all nuances</li>
            <li className="text-gray-700">Page numbers are approximate as they're based on character count estimates</li>
            <li className="text-gray-700">Only books available in plain text format can be summarized</li>
            <li className="text-gray-700">This is a personal project and may have occasional downtime</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
