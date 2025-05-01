import React from 'react';
import Feedback from '../components/Feedback/Feedback';
import RecentCritiques from '../components/RecentCritiques/RecentCritiques';
import { ImageProvider } from '../components/contexts/FeedbackContext';
import UploadSection from '../components/UploadSection/UploadSection';

const HomePage: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
        <ImageProvider>
            <Feedback />
            <UploadSection />
            <RecentCritiques />
        </ImageProvider>
    </main>
  );
};

export default HomePage;