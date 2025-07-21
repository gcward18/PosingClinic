import React from 'react';
import Feedback from '../features/feedback/Feedback';
import { ImageProvider } from '../store/FeedbackContext';
import UploadSection from '../features/uploadsection/UploadSection';
import RecentCritiques from '../features/recentcritiques/RecentCritiques';

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