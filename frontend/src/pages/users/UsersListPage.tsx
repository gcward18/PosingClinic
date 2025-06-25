import React from "react";
import { GenericProvider } from "../../components/contexts/GenericContext";
import GenericTable from "../../components/tables/GenericTable";

export default function UsersListPage() {
    // @ts-ignore
    return (
        <div className="flex items-center justify-center  ">
            <div className="p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">View Users</h2>
                <GenericProvider dataType="users">
                    <GenericTable />
                </GenericProvider>
            </div>
        </div>
    );
}
