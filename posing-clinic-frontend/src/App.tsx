import React from 'react';
import UploadSection from './components/UploadSection';
import Feedback from './components/Feedback';
import { ImageProvider } from './components/contexts/FeedbackContext';
import RecentCritiques from './components/RecentCritiques';

const App: React.FC = () => {
  return (
    <div className="App">
      <main className="container mx-auto px-4 py-8">
        <ImageProvider>
          <Feedback />
          <UploadSection />
          <RecentCritiques />
        </ImageProvider>
      </main>
    </div>
  );
};

export default App;