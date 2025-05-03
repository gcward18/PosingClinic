import React, {useState} from "react";
import 'zero-md';
import ReactMarkdown from 'react-markdown';
import { useFeedbackContext } from '../contexts/FeedbackContext';
    
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'zero-md': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const Feedback: React.FC = () => {
    const {feedback, loading} = useFeedbackContext();
    const hasFeedback = feedback && feedback.trim() !== '';

    return (
        <section id="upload-section" className="mb-12 col-span-3">           
            
            <div className="w-[100%] h-[100%] rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
                        { hasFeedback ? (
                                <div className="text-neutral-700 whitespace-pre-wrap">
                                    <h2 className="text-2xl font-bold mb-4">Your Critique</h2>
                                    <div className="max-h-[50vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-900">
                                        <p className="text-neutral-500">
                                            <ReactMarkdown>{feedback}</ReactMarkdown>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-2 text-sm ">
                                {loading ? (<p>"Processing Feedback...."</p>) : (
                                    <p className="text-neutral-500 mb-4 text-center">
                                        Select a photo and have your feedback generated
                                    </p>
                                )}
                                </div>
                            )
                        }
                </div>
        </section>
    )
}

export default Feedback;