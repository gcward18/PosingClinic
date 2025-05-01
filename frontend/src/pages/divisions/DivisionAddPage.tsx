import React from "react";
import JudgeAddForm from "../components/forms/JudgeAddForm";

export default function JudgeAddPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Add Judge</h2>
                <JudgeAddForm />
            </div>
        </div>
    );
}
