import React from "react";
import DivisionAddForm from "../../components/forms/divisions/DivisionAddForm";

export default function DivisionAddPage() {
    return (
        <div className="flex items-center justify-center  ">
            <div className="p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Add Division</h2>
                <DivisionAddForm />
            </div>
        </div>
    );
}
