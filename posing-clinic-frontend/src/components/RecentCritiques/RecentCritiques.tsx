import React from 'react';

const RecentCritiques: React.FC = () => {
    const critiques = [
        {
            id: 1,
            type: 'Photo',
            reviewer: 'Coach Mike',
            date: 'Jan 15, 2025',
            preview: 'https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=456'
        },
        {
            id: 2,
            type: 'Video',
            reviewer: 'AI Assistant',
            date: 'Jan 14, 2025',
            preview: 'https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=789'
        },
        {
            id: 3,
            type: 'Photo',
            reviewer: 'Coach Sarah',
            date: 'Jan 13, 2025',
            preview: 'https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=123'
        }
    ];

    return (
        <section id="recent-critiques" className="mb-12">
            <h2 className="text-2xl mb-6">Recent Critiques</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {critiques.map(critique => (
                    <div key={critique.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-neutral-200 h-48 flex items-center justify-center">
                            <span className="text-white">{critique.type} Preview</span>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                <img src={critique.preview} className="w-6 h-6 rounded-full mr-2" alt={`${critique.reviewer} profile`} />
                                <span>{critique.reviewer}</span>
                            </div>
                            <p className="text-neutral-600 text-sm">Reviewed on {critique.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentCritiques;