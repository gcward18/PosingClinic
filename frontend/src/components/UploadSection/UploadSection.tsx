import React, { useState } from 'react';
import UploadPhoto from './UploadPhoto';
import ImageCard from '../Feedback/ImageCard';
import { useFeedbackContext } from '../contexts/FeedbackContext';

const UploadSection: React.FC = () => {
    const {imageUrl} = useFeedbackContext();

    return (
        <section id="upload-section" className="mb-12 col-span-1">                 
            <ImageCard src={imageUrl || ' '} size="w-full aspect-square" />
            <UploadPhoto />
        </section>
    );
};

export default UploadSection;