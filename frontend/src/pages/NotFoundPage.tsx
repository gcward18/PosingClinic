import React from "react";

export default function NotFoundPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
                <h2 className="text-2xl font-bold mb-4">404 - Not Found</h2>
                <p className="text-gray-600">The page you are looking for does not exist.</p>
            </div>
        </div>
    );
}
