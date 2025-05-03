import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FeedbackContextType {
  imageUrl: string | null;
  feedback: string | null;
  loading: boolean;
  setImageUrl: (url: string) => void;
  setFeedback: (feedback: string) => void;
  setLoading: (loading: boolean) => void;
}

const FeedbackContext = createContext<FeedbackContextType>({
  imageUrl: null,
  feedback: null,
  loading: false,
  setImageUrl: () => {},
  setFeedback: () => {},
  setLoading: () => {},
});

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <FeedbackContext.Provider value={{ imageUrl, setImageUrl, feedback, setFeedback, loading, setLoading }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedbackContext = () => useContext(FeedbackContext);

export default FeedbackContext;