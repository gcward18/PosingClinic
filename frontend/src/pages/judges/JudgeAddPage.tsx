import React from "react";
import JudgeAddForm from "../../components/forms/judges/JudgeAddForm";

export default function JudgeAddPage() {
    // @ts-ignore
    return (
        <div className="flex items-center justify-center  ">
            <div className="p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Add Judge</h2>
                <JudgeAddForm />
            </div>
        </div>
    );
}
