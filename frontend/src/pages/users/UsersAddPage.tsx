import React from "react";
import UserAddForm from "../../components/forms/users/UserAddForm";

export default function UserAddPage() {
    return (
        <div className="flex items-center justify-center  ">
            <div className="p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Add User</h2>
                <UserAddForm />
            </div>
        </div>
    );
}
