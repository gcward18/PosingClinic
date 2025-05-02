import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

interface Evaluation {
    id: number;
    image_path: string;
    feedback: string;
    created_at: string;
}

const FullCritique: React.FC = () => {
    const { id } = useParams();
    const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvaluation = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/evaluations/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch evaluation');
                }
                const data = await response.json();
                setEvaluation(data);
            } catch (error) {
                console.error('Error fetching evaluation:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvaluation();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!evaluation) return <div>Critique not found</div>;

    // Extract bucket and filename from image_path
    const [bucket, filename] = evaluation.image_path.split('/');
    const imageUrl = `${import.meta.env.VITE_API_URL}/evaluations/file/${bucket}/${filename}`;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Link to="/" className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Critiques
            </Link>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                    src={imageUrl}
                    alt="Pose critique" 
                    className="w-full h-96 object-cover [object-position:center_25%]"
                />
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-medium">AI Critique</h1>
                        <span className="text-neutral-600">
                            {new Date(evaluation.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="text-neutral-700 whitespace-pre-wrap">
                        <ReactMarkdown>{evaluation.feedback}</ReactMarkdown>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FullCritique;