import React from 'react';
import { FileText } from 'lucide-react';

const Header = () => (
  <header className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-blue-600 mr-2" />
          <span className="text-xl font-bold text-gray-900">Research Summarizer</span>
        </div>
        <nav className="flex space-x-8">
          <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Home</a>
          <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">About</a>
          <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Contact</a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;