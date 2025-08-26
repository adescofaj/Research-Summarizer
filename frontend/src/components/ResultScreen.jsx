import React from 'react';
import { Copy, Download, Loader2 } from 'lucide-react';
import Header from './Header';

const ResultScreen = ({ onNavigate, summary, isLoading }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    alert('Summary copied to clipboard!');
  };

  const downloadSummary = () => {
    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'research-summary.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary of Research Paper</h2>
          <p className="text-gray-600 mb-6">
            AI-generated summary based on your selected preferences.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Summary</h3>
            <div className="bg-gray-50 rounded-lg p-6 min-h-[300px] border">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin mr-3" />
                  <span className="text-gray-600">Generating summary...</span>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {summary || 'Your AI-generated summary will appear here. This section will contain the condensed version of your research paper, highlighting the most important findings, methodology, and conclusions. The summary is tailored based on your selected options and will provide a comprehensive yet concise overview of the original document.'}
                </p>
              )}
            </div>
          </div>

          {!isLoading && summary && (
            <div className="flex space-x-4">
              <button 
                onClick={copyToClipboard}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Summary
              </button>
              <button 
                onClick={downloadSummary}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          )}

          {!isLoading && !summary && (
            <div className="flex space-x-4">
              <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors cursor-pointer">
                <Copy className="h-4 w-4 mr-2" />
                Copy Summary
              </button>
              <button className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-500">
            Download options: Plain text, .docx, .pdf
          </div>

          <div className="mt-8 pt-6 border-t">
            <button 
              onClick={() => onNavigate('home')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Summarize Another Paper
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;