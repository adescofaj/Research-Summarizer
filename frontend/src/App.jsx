import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen.jsx'
import UploadScreen from './components/UploadScreen.jsx';
import OptionsScreen from './components/OptionsScreen.jsx';
import ResultScreen from './components/ResultScreen.jsx';

// Main App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [summaryOptions, setSummaryOptions] = useState({
    type: '',
    length: 500,
    sections: ''
  });
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div>
      {currentScreen === 'home' && <HomeScreen onNavigate={handleNavigation} />}
      {currentScreen === 'upload' && (
        <UploadScreen 
          onNavigate={handleNavigation} 
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
        />
      )}
      {currentScreen === 'options' && (
        <OptionsScreen 
          onNavigate={handleNavigation}
          summaryOptions={summaryOptions}
          setSummaryOptions={setSummaryOptions}
          uploadedFile={uploadedFile}
          setSummary={setSummary}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      )}
      {currentScreen === 'result' && (
        <ResultScreen 
          onNavigate={handleNavigation}
          summary={summary}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default App;