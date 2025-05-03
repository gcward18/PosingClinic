import { useState } from 'react';
import {EntityAPI} from '../../../apis/entity_apis'
import React from 'react';
import {Competitor} from "../../../types";

export default function CompetitorAddForm() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [sex, setSex] = useState('');
    const api = new EntityAPI('competitors')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const competitor: Competitor = await api.create({ height, weight, sex });
            alert(`Added Competitor: ${competitor.height} ${competitor.weight} to our library!);`);
        } catch (error) {
            console.error('Registration error:', error);
            alert(`Adding ${height} ${weight} failed. Please try again.`);
        }
    };
    return (
        <div className="flex items-center justify-center  ">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="string"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="sexAllowed" className="block text-sm font-medium text-gray-700">Last
                        Name</label>
                    <select
                        id="sexAllowed"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-gray-700"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
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
