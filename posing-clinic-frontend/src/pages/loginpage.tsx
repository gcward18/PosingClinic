import LoginForm from "../components/forms/loginform";
import React, { useEffect } from "react";
import { isAuthenticated } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/home");
        }
    }, [navigate]);
    // Check if the user is already authenticated
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <LoginForm />
            </div>
        </div>
    );
}