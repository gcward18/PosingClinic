import { useState } from 'react';
import {EntityAPI} from '../../../apis/entity_apis'
import React from 'react';
import {Judge} from "../../../types";

export default function JudgeAddForm() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const api = new EntityAPI('judges')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const judge: Judge = await api.create({ firstname, lastname });
            alert(`Added Judge: ${judge.firstname} ${judge.lastname} to our library!);`);
        } catch (error) {
            console.error('Registration error:', error);
            alert(`Adding ${firstname} ${lastname} failed. Please try again.`);
        }
    };
    
    return (
        <div className="flex items-center justify-center ">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="string"
                        id="lastname"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
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
