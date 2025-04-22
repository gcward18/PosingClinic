import React, { useState } from 'react';
import UploadPhoto from './UploadPhoto';
import UploadVideo from './UploadVideo';

const UploadSection: React.FC = () => {

    return (
        <section id="upload-section" className="mb-12">           
            <h2 className="text-2xl mb-6">Upload Your Content</h2>
            <div className="grid md:grid-cols-1 gap-8">
                <UploadPhoto />
                {/* <UploadVideo /> */}
            </div>
        </section>
    );
};

export default UploadSection;