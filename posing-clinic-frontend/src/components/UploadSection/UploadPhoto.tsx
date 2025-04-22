
import React from 'react';
import { useFeedbackContext } from '../contexts/FeedbackContext';
import dedent from 'dedent';

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}


const UploadPhoto: React.FC = () => {
    const { setImageUrl, setFeedback } = useFeedbackContext();

    const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0];
            if (!file) return;
            
            // Create a URL for the file and set the preview image for the feedback
            const previewUrl = URL.createObjectURL(file)
            setImageUrl(previewUrl);
    
            const formData = new FormData();
            formData.append('file', file);
    
            const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('File uploaded successfully:', data.response);
            setFeedback(data.response);
        } catch (error) {
            console.error('Error uploading file:', error);
            setFeedback('Error uploading file');
        }
    };

    return (
        <div className=" rounded-lg p-8 text-center">
            <div id="photo-upload-location" className="relative">
                
                {/* <div id="upload-photo-default" className="flex flex-col items-center justify-center  rounded-lg p-6 hover:border-neutral-400 cursor-pointer transition">
                    <FaImage className="text-4xl text-neutral-400 mb-4" />
                    <h3 className="text-lg mb-2">Upload Photo</h3>
                    <p className="text-neutral-500 mb-4 text-center">
                        Drop your photos here or click to browse
                    </p>
                </div> */}

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="photo-upload-file-input"
                    onChange={handlePhotoUpload}
                />
                <button className="bg-neutral-900 text-white px-6 py-2 rounded-lg" id="photo-upload-button" onClick={() => document.getElementById('photo-upload-file-input')?.click()}>
                    Select Photo
                </button>
            </div>
        </div>
    );
}

export default UploadPhoto;