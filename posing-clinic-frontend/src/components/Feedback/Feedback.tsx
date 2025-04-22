import React, {useState} from "react";
import ImageCard from "./ImageCard";
import { useFeedbackContext } from '../contexts/FeedbackContext';
import 'zero-md';
import ReactMarkdown from 'react-markdown';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'zero-md': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const Feedback: React.FC = () => {
    const {imageUrl, feedback} = useFeedbackContext();
    const hasFeedback = feedback && feedback.trim() !== '';

    return (
        <section id="upload-section" className="mb-12">           
            <h2 className="text-2xl mb-6">Your Feedback</h2>
            <div className="flex gap-[10px] mb-4">
                <div className="w-[90%] rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
                   
                        { hasFeedback ? (
                                <div className="prose dark:prose-invert p-6">
                                    <ReactMarkdown>{feedback}</ReactMarkdown>
                                </div>
                            ) : (
                                <p className="mt-2 text-sm ">
                                {"No Feedback Recievied feedback yet...."}
                                </p>
                            )
                        }
                </div>
                <div className="w-[10%] flex justify-center items-center">
                    <ImageCard src={imageUrl || ' '} size="w-full aspect-square" />
                </div>
            </div>
        </section>
    )
}

export default Feedback;