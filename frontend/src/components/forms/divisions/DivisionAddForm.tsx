import { useState } from 'react';
import {EntityAPI} from '../../../apis/entity_apis'
import React from 'react';
import {Division} from "../../../types";

export default function DivisionAddForm() {
    const [name, setName] = useState('');
    const [sexAllowed, setSexAllowed] = useState('');
    const api = new EntityAPI('divisions')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const division: Division = await api.create({ name, sexAllowed });
            alert(`Added Division: ${division.name} to our library!);`);
        } catch (error) {
            console.error('Registration error:', error);
            alert(`Adding ${name} ${sexAllowed} failed. Please try again.`);
        }
    };
    return (
        <div className="flex items-center justify-center  ">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="sexAllowed" className="block text-sm font-medium text-gray-700">Last
                        Name</label>
                    <select
                        id="sexAllowed"
                        value={sexAllowed}
                        onChange={(e) => setSexAllowed(e.target.value)}
                        required
                        className="t-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-gray-700"
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
