import React, { useEffect, useState } from 'react';

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
                <h2 className="text-2xl mb-6">Recent Critiques</h2>
                <div>Loading...</div>
            </section>
        );
    }

    return (
        <section id="recent-critiques" className="mb-12">
            <h2 className="text-2xl mb-6">Recent Critiques</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {evaluations.map(evaluation => {
                    // Extract bucket and filename from image_path
                    const [bucket, filename] = evaluation.image_path.split('/');
                    const imageUrl = `${import.meta.env.VITE_API_URL}/evaluations/file/${bucket}/${filename}`;
                    
                    return (
                        <div key={evaluation.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 overflow-hidden">
                                <img 
                                    src={imageUrl}
                                    alt="Pose critique" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">AI Critique</span>
                                    <span className="text-neutral-600 text-sm">
                                        {formatDate(evaluation.created_at)}
                                    </span>
                                </div>
                                <p className="text-neutral-600 text-sm line-clamp-2">
                                    {evaluation.feedback}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default RecentCritiques;