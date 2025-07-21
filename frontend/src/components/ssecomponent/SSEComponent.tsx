import React, {useState, useEffect, useRef} from "react";
import { useSSE } from "../../hooks/useSSE";

export default function SSEComponent() {
    const message = useSSE(`${import.meta.env.VITE_API_URL}/evaluations/stream`);

    return (
        <div>
            <h1>Server-Sent Events</h1>
            <p>Message from server: {message}</p>
        </div>
    );
}