import { useState } from 'react';
import {EntityAPI} from '../../../apis/entity_apis'
import React from 'react';
import {Competition} from "../../../types";

export default function CompetitionAddForm() {
    const [competitionName, setCompetitionName] = useState('');
    const [date, setDate] = useState('');
    const api = new EntityAPI('competitions')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const competition: Competition = await api.create({ competitionName });
            alert(`Added Competition: ${competition.name} ${competition.date} to our library!);`);
        } catch (error) {
            console.error('Registration error:', error);
            alert(`Adding ${name} failed. Please try again.`);
        }
    };
    return (
        <div className="flex items-center justify-center  ">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="competitionName" className="block text-sm font-medium text-gray-700">Competition Name</label>
                    <input
                        type="text"
                        id="competitionName"
                        value={competitionName}
                        onChange={(e) => setCompetitionName(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-gray-700"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Add
                </button>
            </form>
        </div>
    );
}
