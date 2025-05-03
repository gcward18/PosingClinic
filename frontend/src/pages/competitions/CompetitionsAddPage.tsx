import React from "react";
import CompetitionAddForm from "../../components/forms/competitions/CompetitionAddForm";

export default function CompetitionAddPage() {
    return (
        <div className="flex items-center justify-center  ">
            <div className="p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Add Competition</h2>
                <CompetitionAddForm />
            </div>
        </div>
    );
}
