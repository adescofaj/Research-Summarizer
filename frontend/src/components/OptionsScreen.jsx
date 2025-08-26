import React from 'react';
import { Loader2 } from 'lucide-react';
import Header from './Header';

const OptionsScreen = ({ onNavigate, summaryOptions, setSummaryOptions, uploadedFile, setSummary, setIsLoading, isLoading }) => {
  
  const handleSummarize = async () => {
    if (!uploadedFile) {
      alert('No file uploaded');
      return;
    }

    setIsLoading(true);
    setSummary('');

    try {
      // Prepare payload for API
      const payload = {
        file: {
          name: uploadedFile.name,
          type: uploadedFile.type,
          content: uploadedFile.base64
        },
        options: {
          type: summaryOptions.type,
          length: summaryOptions.length,
          sections: summaryOptions.sections
        }
      };

      // API call to summarize-agent
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/api/summarize-agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.summary || 'Summary generated successfully');
      
      // Navigate to result page only on success
      onNavigate('result');
      
    } catch (error) {
      console.error('Summarization error:', error);
      setSummary('Error: Unable to generate summary. Please try again.');
      alert('Failed to generate summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Summary Options</h2>
          
          <div className="space-y-6">
            {/* Summary Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Summary Type</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={summaryOptions.type}
                onChange={(e) => setSummaryOptions({...summaryOptions, type: e.target.value})}
              >
                <option value="">Select summary type...</option>
                <option value="concise">Concise Overview</option>
                <option value="detailed">Detailed Analysis</option>
                <option value="bullet">Bullet Points</option>
                <option value="executive">Executive Summary</option>
              </select>
            </div>

            {/* Length Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Length Control</label>
              <div className="px-4">
                <input
                  type="range"
                  min="200"
                  max="1500"
                  value={summaryOptions.length}
                  onChange={(e) => setSummaryOptions({...summaryOptions, length: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Short</span>
                  <span className="font-medium">Medium (Approx. {summaryOptions.length} characters)</span>
                  <span>Long</span>
                </div>
              </div>
            </div>

            {/* Section Inclusion */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Inclusion</label>
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Specific Sections (optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Introduction, Methods, Results, Conclusion"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={summaryOptions.sections}
                  onChange={(e) => setSummaryOptions({...summaryOptions, sections: e.target.value})}
                />
              </div>
              <div className="text-sm text-gray-500">
                If no sections are specified, all sections will be summarized.
              </div>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSummarize}
              disabled={isLoading}
              className={`w-full font-semibold py-3 px-6 rounded-md transition-colors mt-8 flex items-center justify-center ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              } text-white`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating Summary...
                </>
              ) : (
                'Summarize'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsScreen;