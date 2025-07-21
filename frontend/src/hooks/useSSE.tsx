import { useEffect, useRef, useState } from "react";

export function useSSE(sseUrl: string) {
    const [message, setMessage] = useState<string>("");
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        workerRef.current = new Worker(
            new URL('../utils/workers/sseWorker.ts', import.meta.url),
            { type: 'module' }
        );

        workerRef.current.onmessage = (event) => {
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

        workerRef.current.onerror = (error) => {
            console.error("Worker error:", error);
        };

        workerRef.current.postMessage({ url: sseUrl });

        return () => {
            if (workerRef.current) {
                workerRef.current.postMessage({ type: "close" });
                workerRef.current.terminate();
                workerRef.current = null;
            }
        };
    }, [sseUrl]);

    return message;
}