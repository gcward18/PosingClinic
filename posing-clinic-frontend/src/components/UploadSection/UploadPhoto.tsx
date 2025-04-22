import React from 'react';
import { useFeedbackContext } from '../contexts/FeedbackContext';
import dedent from 'dedent';

const UploadPhoto: React.FC = () => {
    const { setImageUrl, setFeedback } = useFeedbackContext();

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        
        // Create a URL for the file and set the preview image for the feedback
        const previewUrl = URL.createObjectURL(file)
        setImageUrl(previewUrl);

        const formData = new FormData();
        formData.append('file', file);
        
        // Set the default response for the feedback this is for testing purposes
        // In a real application, you would send the formData to the server for processing
        // and get the response back to set the feedback
        // For now, we will just set a default response
        const defaultResponse = `The image shows a bodybuilder performing a side double biceps pose, which is a classic pose used in bodybuilding competitions to showcase muscular development.

            **Strengths:**

            * The bodybuilder's back and arm muscles are well-developed, with visible striations and definition.
            * His latissimus dorsi muscles are wide and symmetrical, which is a key aspect of a well-developed back.
            * His biceps are also well-developed, with a clear peak and separation from the surrounding muscles.

            **Weaknesses:**

            * The bodybuilder's legs appear to be slightly bent, which can detract from the overall symmetry and aesthetics of the pose. In a side double biceps pose, the legs are typically straight or slightly bent at the knee, with the feet shoulder-width apart.
            * The bodybuilder's core muscles do not appear to be as well-developed as his upper body, which could be a weakness in his overall physique.
            * The pose could benefit from a more dramatic shoulder roll, which would help to accentuate the development of his upper back and shoulders. 
            * The bodybuilder's right arm appears to be slightly lower than his left arm, which can make the pose appear less symmetrical. 

            Overall, the bodybuilder has a well-developed upper body, but may need to work on his lower body and core muscles to achieve greater overall symmetry and balance.`

        try {
            // Upload the file to the server
            setFeedback(dedent(defaultResponse));

            // fetch('http://127.0.0.1:5000/upload', {
            //     method: 'POST',
            //     body: formData,
            // })
            // .then(response => response.json())
            // .then(data => {
            //     console.log('File uploaded successfully:', data.response);
            //     setFeedback(data.response);
            // })
            // .catch(error => {
            //     setFeedback("Error uploading file");
            //     console.error('Error uploading file:', error);
            // });
        } 
        catch (error) {
            console.error("Error uploading file:", error);
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