import React from "react";
import CompetitorAddForm from "../../components/forms/competitors/CompetitorAddForm";

export default function CompetitorAddPage() {
    return (
        <div className="flex items-center justify-center  ">
            <div className="p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Add Competitor</h2>
                <CompetitorAddForm />
            </div>
        </div>
    );
}
