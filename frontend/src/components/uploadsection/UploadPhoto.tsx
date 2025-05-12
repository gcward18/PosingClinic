
import React, { useEffect } from 'react';
import { useFeedbackContext } from '../contexts/FeedbackContext';

const UploadPhoto: React.FC = () => {
    const { setImageUrl, setFeedback, setLoading } = useFeedbackContext();
    const workerRef = React.useRef<Worker | null>(null);

    useEffect(() => {
        // initalize the worker
        const worker = new Worker(
            new URL('../../utils/workers/sseWorker.ts', import.meta.url),
            { type: 'module' }
        );

        worker.onmessage = (event) => {
            switch (event.data.type) {
                case 'evaluation_response':
                    setFeedback(event.data.data.result);
                    setLoading(false);
                    break;
                case 'sse_error':
                    console.error('SSE Error:', event.data.error);
                    setLoading(false);
                    setFeedback('Error receiving updates');
                    break;

            }
        };

        worker.onerror = (error) => {
            console.error('Worker error:', error);
            setLoading(false);
            setFeedback('Error in worker communication');
        };

        workerRef.current = worker;

        return () => {
            worker.postMessage({ type: 'close' });
            worker.terminate();
        }
    }, []);

    const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0];
            if (!file) return;
            
            // Create a URL for the file and set the preview image for the feedback
            const previewUrl = URL.createObjectURL(file)
            setImageUrl(previewUrl);
    
            const formData = new FormData();
            formData.append('file', file);

            // request to upload the file and receive the feedback, set loading to true
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/evaluations/upload`, {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                setLoading(false);
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setFeedback('Error uploading file');
        }
    };

    return (
        <div className=" rounded-lg p-8 text-center">
            <div id="photo-upload-location" className="relative">
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="photo-upload-file-input"
                    onChange={handlePhotoUpload}
                />
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg" id="photo-upload-button" onClick={() => document.getElementById('photo-upload-file-input')?.click()}>
                    Select Photo
                </button>
            </div>
        </div>
    );
}

export default UploadPhoto;