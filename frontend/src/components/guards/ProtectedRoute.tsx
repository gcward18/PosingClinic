import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import React from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    // Check if the user is authenticated
    const isLoggedIn = isAuthenticated();

    // If not authenticated, redirect to the login page
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    // If authenticated, render the children components
    return children;
}