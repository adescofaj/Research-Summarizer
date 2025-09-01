import React from 'react';
import { Upload, FileText, Zap } from 'lucide-react';
import Header from './Header';

const HomeScreen = ({ onNavigate }) => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    
    {/* Hero Section */}
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="relative mb-8">
            {/* Clean gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-800 to-teal-900 rounded-2xl"></div>
            
            <div className="relative z-10 px-12 py-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Summarize Research Papers Instantly
              </h1>
              <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
                Get concise summaries of complex research papers in seconds. Save time and stay informed with our AI-powered summarization tool.
              </p>
              <button 
                onClick={() => onNavigate('upload')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg cursor-pointer"
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* How It Works Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
        <h3 className="text-2xl font-semibold text-gray-700 mb-8">Three Simple Steps</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our AI-powered system simplifies complex research papers into easy-to-understand summaries.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="text-center">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Input Your Research</h4>
          <p className="text-gray-600">
            Upload your research paper in PDF or DOCX format.
          </p>
        </div>

        {/* Step 2 */}
        <div className="text-center">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Summarization</h4>
          <p className="text-gray-600">
            Our advanced AI algorithm analyzes and condenses the paper's content.
          </p>
        </div>

        {/* Step 3 */}
        <div className="text-center">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Get Concise Summaries</h4>
          <p className="text-gray-600">
            Receive clear and relevant summaries highlighting the key findings and insights.
          </p>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center space-x-8 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-700">Terms of Service</a>
          <a href="#" className="hover:text-gray-700">Privacy Policy</a>
          <a href="#" className="hover:text-gray-700">Contact Us</a>
        </div>
        <div className="text-center text-sm text-gray-400 mt-4">
          © 2025 Research Summarizer. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
);

export default HomeScreen;