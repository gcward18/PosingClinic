const sseUrl = `${import.meta.env.VITE_API_URL}/evaluations/stream`; // Replace with your actual SSE endpoint

function connectSSE() {
  fetch(sseUrl, {
    headers: {
      'Accept': 'text/event-stream'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.body?.getReader();
  })
  .then(reader => {
    if (!reader) {
        return;
    }
    const decoder = new TextDecoder();
    let partialData = '';

    function read() {
      reader?.read().then(({ done, value }) => {
        if (done) {
          console.log('SSE stream closed by server.');
          // Optionally attempt to reconnect after a delay
          // setTimeout(connectSSE, 5000);
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = (partialData + chunk).split('\n');
        partialData = lines.pop(); // Store any incomplete line

        lines.forEach(line => {
          if (line.startsWith('data:')) {
            const eventData = line.substring(5).trim();
            try {
              const parsedData = JSON.parse(eventData);
              postMessage({ type: parsedData?.type, data: parsedData });
            } catch (error) {
              console.error('Error parsing SSE data:', error, eventData);
            }
          } 
        });

        read(); // Continue reading the stream
      }).catch(error => {
        console.error('Error reading SSE stream:', error);
        // Optionally attempt to reconnect after a delay
        // setTimeout(connectSSE, 5000);
      });
    }

    read(); // Start reading the stream
  })
  .catch(error => {
    console.error('Error connecting to SSE endpoint:', error);
    // Optionally attempt to reconnect after a delay
    // setTimeout(connectSSE, 5000);
  });
}

connectSSE();
