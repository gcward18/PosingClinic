import React, {useState, useEffect, useRef} from "react";

export default function SSEComponent() {
    const [message, setMessage] = useState("");
    const sseWorkerRef = useRef<Worker | null>(null);

    useEffect(() => {
        // create new worker instance
        sseWorkerRef.current = new Worker(
            new URL('../../utils/workers/sseWorker.ts', import.meta.url),
            { type: 'module' }
        );

        // listen for messages from the worker
        sseWorkerRef.current.onmessage = (event) => {
            switch (event.data.type) {
                case "evaluation_response":
                    setMessage(event.data.data);
                    break;
                case "sse_error":
                    console.error("SSE error:", event.data.error);
                    break;
                default:
                    console.error("Unknown message type:", event.data.type);
            }
        };
        // Handle worker errors
        sseWorkerRef.current.onerror = (error) => {
            console.error("Worker error:", error);
        }

        // Cleanup function to terminate the worker when the component unmounts
        return () => {
            if (sseWorkerRef.current) {
                sseWorkerRef.current.postMessage({type: "close"});
                sseWorkerRef.current.terminate();
                sseWorkerRef.current = null;    
            }
        }

    }, []);

    return (
        <div>
            <h1>Server-Sent Events</h1>
            <p>Message from server: {message}</p>
        </div>
    );
}