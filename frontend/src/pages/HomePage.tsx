import React from 'react';
import Feedback from '../components/feedback/Feedback';
import { ImageProvider } from '../components/contexts/FeedbackContext';
import UploadSection from '../components/uploadsection/UploadSection';
import RecentCritiques from '../components/recentcritiques/RecentCritiques';

const HomePage: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
        <ImageProvider>
            <div className='grid grid-cols-4 md:flex-row gap-8 mb-12'>
              <UploadSection />
              <Feedback />
            </div>
        </ImageProvider>
        
        <RecentCritiques />
    </main>
  );
};

export default HomePage;