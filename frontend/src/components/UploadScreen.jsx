import React, { useState } from 'react';
import { Upload, CheckCircle, X, Loader2 } from 'lucide-react';
import Header from './Header';

const UploadScreen = ({ onNavigate, uploadedFile, setUploadedFile }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState('');

  // Convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Validate file before processing
  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (file.size > maxSize) {
      return 'File size must be less than 10MB';
    }

    if (!allowedTypes.includes(file.type)) {
      return 'Only PDF and DOCX files are supported';
    }

    return null;
  };

  // Process file upload
  const processFile = async (file) => {
    setError('');
    
    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsConverting(true);
      
      // Convert to Base64
      const base64 = await convertToBase64(file);
      
      // Store file data with Base64
      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type,
        base64: base64,
        originalFile: file
      });
      
    } catch (error) {
      setError('Failed to process file. Please try again.');
      console.error('File conversion error:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Upload Research Paper</h2>
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          {!uploadedFile && !isConverting ? (
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Drop your research paper here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse files
              </p>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md cursor-pointer transition-colors inline-block"
              >
                Choose File
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: PDF, DOCX (Max 10MB)
              </p>
            </div>
          ) : isConverting ? (
            // Loading State
            <div className="border border-gray-300 rounded-lg p-12 text-center">
              <Loader2 className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Processing File...
              </h3>
              <p className="text-gray-600">
                Converting your document for analysis
              </p>
            </div>
          ) : (
            <div className="border border-gray-300 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{uploadedFile.name}</h3>
                    <p className="text-sm text-gray-600">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for processing
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={() => onNavigate('options')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors cursor-pointer"
                >
                  Continue to Summary Options
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadScreen;