import RegisterForm from "../components/forms/reisterform";
import React from "react";

export default function RegisterPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <RegisterForm />
            </div>
        </div>
    );
}