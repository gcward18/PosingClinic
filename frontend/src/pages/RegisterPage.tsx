import RegisterForm from "../components/forms/RegisterForm";
import React from "react";

export default function RegisterPage() {
    return (
        <div className="flex items-center justify-center  ">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <RegisterForm />
            </div>
        </div>
    );
}
