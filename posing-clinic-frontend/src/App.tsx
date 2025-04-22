import React from 'react';
import UploadSection from './components/UploadSection';
import Feedback from './components/Feedback';
import { ImageProvider } from './components/contexts/FeedbackContext';
// import CritiqueOptions from './components/CritiqueOptions';
// import RecentCritiques from './components/RecentCritiques';

const App: React.FC = () => {
  return (
    <div className="App">
      <main className="container mx-auto px-4 py-8">
        <ImageProvider>
          <Feedback />
          <UploadSection />
        </ImageProvider>
{/*         
        <CritiqueOptions />
        <RecentCritiques /> */}
      </main>
    </div>
  );
};

export default App;