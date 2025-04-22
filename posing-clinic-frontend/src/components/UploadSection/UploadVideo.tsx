import React, { useState } from 'react';
import { FaVideo } from 'react-icons/fa';

const UploadPhoto: React.FC = () => {
    const [videoFiles, setVideoFiles] = useState<File[]>([]);


    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            setVideoFiles(files);
        }
    };

    return (
        <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center">
            <div id="video-upload-location" className="relative">
                <div id="upload-photo-default" className="flex flex-col items-center justify-center cursor-pointer transition">
                    <FaVideo className="text-4xl text-neutral-400 mb-4" />
                    <h3 className="text-lg mb-2">Upload Video</h3>
                    <p className="text-neutral-500 mb-4 text-center">
                        Drop your photos here or click to browse
                    </p>
                </div>
                <input
                    type="file"
                    accept="video/*"
                    multiple
                    className="hidden"
                    id="video-upload-file-input"
                    onChange={handleVideoUpload}
                />
                <button className="bg-neutral-900 text-white px-6 py-2 rounded-lg" id="video-upload-button" onClick={() => document.getElementById('video-upload-file-input')?.click()}>
                    Select Video
                </button>
            </div>
        </div>
    );
}

export default UploadPhoto;