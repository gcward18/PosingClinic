type = null
document.getElementById('photo-upload-button').addEventListener('click', function() {
    console.log('Photo upload button clicked');
    type = 'photo';
    document.getElementById('photo-upload-file-input').click();
});

document.getElementById('video-upload-button').addEventListener('click', function() {
    type = 'video';
    document.getElementById('video-upload-file-input').click();
});

const modelSelector = document.getElementById('llamaModelSelect');
const llama_url = 'http://localhost:5000/upload'; // Replace with your actual URL
let img = document.getElementById('photo-preview');


img_finished = function(e) {
    URL.revokeObjectURL(img.src); // Free up memory
}

img.onload = img_finished;
img.onerror = img_finished;

let video = document.getElementById('video-preview');


video_finished = function(e) {
    URL.revokeObjectURL(video.src); // Free up memory
}

video.onload = video_finished;
video.onerror = video_finished;
    
handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (type == 'photo') {
        document.getElementById('upload-photo-default').style.display = 'none';
        document.getElementById('photo-preview-container').style.display = 'flex';
        img.src = URL.createObjectURL(file); // Create a local URL for the image
    } else if (type == 'video') {
        document.getElementById('upload-video-default').style.display = 'none';
        document.getElementById('video-preview-container').style.display = 'flex';
        video.src = URL.createObjectURL(file); // Create a local URL for the image
    }
    if (file) {
        formData = new FormData();
        formData.append('file', file);
        metadata = {
            name: file.name,
            size: file.size,
            type: file.type,
            model: 'llama3.2-vision:11b',
        };
        formData.append('metadata', JSON.stringify(metadata));  // <-- fixed typo here

        fetch(llama_url, {method: 'POST', body: formData})
            .then(response => { response.json()})
            .then(data => { console.log('Response:', data)})

        } 
    else {
        console.log('No file selected');
    }
}

document.getElementById('photo-upload-file-input').addEventListener('change', handleFileSelect);
document.getElementById('video-upload-file-input').addEventListener('change', handleFileSelect);