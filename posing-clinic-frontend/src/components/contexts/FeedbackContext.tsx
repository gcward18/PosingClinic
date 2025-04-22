import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FeedbackContextType {
  imageUrl: string | null;
  feedback: string | null;
  setImageUrl: (url: string) => void;
  setFeedback: (feedback: string) => void;
}

const FeedbackContext = createContext<FeedbackContextType>({
  imageUrl: null,
  feedback: null,
  setImageUrl: () => {},
  setFeedback: () => {},
});

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <FeedbackContext.Provider value={{ imageUrl, setImageUrl, feedback, setFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedbackContext = () => useContext(FeedbackContext);

export default FeedbackContext;