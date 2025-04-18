const fileInput = document.getElementById('fileInput');
const modelSelector = document.getElementById('llamaModelSelect');
const llama_url = 'http://localhost:5000/upload'; // Replace with your actual URL

handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        console.log('File selected:', file.name, file.size, 'bytes', file.type);
        formData = new FormData();
        formData.append('file', file);
        metadata = {
            name: file.name,
            size: file.size,
            type: file.type,
            model: modelSelector.value,
        };
        formData.append('metadata', JSON.stringify(metadata));  // <-- fixed typo here
        console.log('FormData:', formData);
        fetch(llama_url, {method: 'POST', body: formData})
            .then(response => { response.json()})
            .then(data => { console.log('Response:', data)})
    } else {
        console.log('No file selected');
    }
}
fileInput.addEventListener('change', handleFileSelect);