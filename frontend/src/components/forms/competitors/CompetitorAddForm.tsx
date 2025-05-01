import { useState } from 'react';
import {EntityAPI} from '../../../apis/entity_apis'
import React from 'react';
import {User} from "../../../types";

export default function UserAddForm() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const api = new EntityAPI('users')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user: User = await api.create({ firstname, lastname });
            alert(`Added User: ${user.firstname} ${user.lastname} to our library!);`);
        } catch (error) {
            console.error('Registration error:', error);
            alert(`Adding ${firstname} ${lastname} failed. Please try again.`);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Add User</h2>
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
        </div>
    );
}
