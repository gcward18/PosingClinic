import React, {useState} from "react";
import { useFeedbackContext } from '../contexts/FeedbackContext';
import { FaImage } from "react-icons/fa";

interface ImageCardProps {
    src?: string;
    alt?: string;
    size?: string;
  }
  
const ImageCard: React.FC<ImageCardProps> = ({src, alt, size="w-40 h-40"}) => {
    const {imageUrl} = useFeedbackContext();
    const hasImage = imageUrl && imageUrl.trim() !== '';

    return (
        <div
            className="overflow-hidden w-full aspect-square rounded-xl shadow-2xl ring-1 ring-gray-900 transition-transform duration-300 hover:scale-105 flex items-center justify-center"
        >
            {
                hasImage ? (
                    <img
                        src={imageUrl || src}
                        alt={alt}
                        className="w-full h-full object-contain transition-transform duration-300"
                        />
                ) :
                (
                    <FaImage
                        className="w-1/2 h-1/2 object-contain transition-transform duration-300"
                    />
                )
            }
        </div>
    );
}


export default ImageCard;