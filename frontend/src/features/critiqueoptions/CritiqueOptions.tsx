import React from 'react';

const CritiqueOptions: React.FC = () => {
    return (
        <section id="critique-options" className="mb-12">
            <h2 className="text-2xl mb-6">Choose Your Critic</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="border rounded-lg p-6 hover:shadow-lg transition">
                    <div className="flex items-center mb-4">
                        <i className="fa-solid fa-user-tie text-3xl text-neutral-700 mr-4"></i>
                        <div>
                            <h3 className="text-lg">Professional Coach</h3>
                            <p className="text-neutral-500">Get personalized feedback from experts</p>
                        </div>
                    </div>
                    <button className="w-full bg-neutral-900 text-white py-2 rounded-lg">Choose Coach</button>
                </div>
                <div className="border rounded-lg p-6 hover:shadow-lg transition">
                    <div className="flex items-center mb-4">
                        <i className="fa-solid fa-robot text-3xl text-neutral-700 mr-4"></i>
                        <div>
                            <h3 className="text-lg">AI Assistant</h3>
                            <p className="text-neutral-500">Instant feedback powered by AI</p>
                        </div>
                    </div>
                    <button className="w-full bg-neutral-900 text-white py-2 rounded-lg">Use AI</button>
                </div>
            </div>
        </section>
    );
};

export default CritiqueOptions;