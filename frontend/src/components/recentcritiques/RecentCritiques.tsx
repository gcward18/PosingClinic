import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Evaluation {
    id: number;
    image_path: string;
    feedback: string;
    created_at: string;
}

const RecentCritiques: React.FC = () => {
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvaluations = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/evaluations/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch evaluations');
                }
                const data = await response.json();
                setEvaluations(data);
            } catch (error) {
                console.error('Error fetching evaluations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvaluations();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) {
        return (
            <section id="recent-critiques" className="mb-12">
                <h2 className="text-2xl mb-6">Previous Critiques</h2>
                <div>Loading...</div>
            </section>
        );
    }

    return (
        <section id="recent-critiques" className="mb-12">
            <h2 className="text-2xl mb-6">Previous Critiques</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {evaluations.map(evaluation => {
                    // Extract bucket and filename from image_path
                    const [bucket, filename] = evaluation.image_path.split('/');
                    const imageUrl = `${import.meta.env.VITE_API_URL}/evaluations/file/${bucket}/${filename}`;
                    
                    return (
                        <div className="relative block w-full aspect-square overflow-hidden group">
                            <img 
                                src={imageUrl}
                                alt="Pose critique" 
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                loading='lazy'
                            />

                            {/* Button appears on hover */}
                            <Link
                                to={`/critique/${evaluation.id}`}
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 text-xl bg-blue-500/60 !text-white rounded opacity-0 group-hover:opacity-100 transition hover:cursor-pointer"
                            >
                                View
                            </Link>
                            
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default RecentCritiques;


// <div className="p-4 col-span-2">
// <div className="flex items-center justify-between mb-2">
//     <span className="font-medium">AI Critique</span>
//     <span className="text-neutral-600 text-sm">
//         {formatDate(evaluation.created_at)}
//     </span>
// </div>
// <p className="text-neutral-600 text-sm line-clamp-2 flex-grow">
//     {evaluation.feedback.replace(/\*/g, '')}
// </p>
// <Link 
//     to={`/critique/${evaluation.id}`}
//     className="mt-3 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
// >
//     <span>View Full Critique</span>
//     <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//     </svg>
// </Link>
// </div>