document.getElementById('mediaInput').addEventListener('change', handleMediaSelect, false);

let videoPlayer = document.getElementById('videoPlayer');
let imagePreview = document.getElementById('imagePreview');
let loadingSpinner = document.getElementById('loadingSpinner');
let progressBarContainer = document.getElementById('progressBarContainer');
let progressBar = document.getElementById('progressBar');
let resultText = document.getElementById('resultText');
let detectionMessage = document.getElementById('detectionMessage');
let checkButton = document.getElementById('checkButton');
let mediaThumbnail = document.getElementById('mediaThumbnail');

function handleMediaSelect(event) {
    let file = event.target.files[0];

    if (file) {
        
        videoPlayer.style.display = 'none';
        imagePreview.style.display = 'none';
        mediaThumbnail.style.display = 'none';

        let url = URL.createObjectURL(file);

        
        if (file.type.startsWith('video')) {
            videoPlayer.src = url;
            videoPlayer.style.display = 'block';
        } else if (file.type.startsWith('image')) {
            imagePreview.src = url;
            imagePreview.style.display = 'block';
        }

       
        checkButton.disabled = false;


        mediaThumbnail.innerHTML = `Previewing: ${file.name}`;
        mediaThumbnail.style.display = 'flex';
    }
}

checkButton.addEventListener('click', async () => {
    resultText.textContent = "processing...plz..wait.?";
    detectionMessage.textContent = "Please wait while we analyze the media.";

    // Show loading spinner and progress bar
    loadingSpinner.style.display = 'block';
    progressBarContainer.style.display = 'block';

    // Simulate deepfake check with progress
    await simulateProcessing();

    // Display the result
    let result = await checkForDeepfake();

    if (result) {
        resultText.textContent = "This media is likely a DeepFake Ai Generated... ";
    } else {
        resultText.textContent = "This media appears to be real...";
    }

    detectionMessage.textContent = "Analysis completed.";

    // Hide loading spinner
    loadingSpinner.style.display = 'none';
});

async function simulateProcessing() {
    // Simulate the progress bar filling over 5 seconds
    for (let i = 0; i <= 100; i++) {
        await new Promise(resolve => setTimeout(resolve, 50)); // Simulate delay
        progressBar.style.width = i + '%';
    }
}

async function checkForDeepfake() {
    // Placeholder for actual deepfake detection logic (e.g., ML model call or API request)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Math.random() > 0.5); // Random result for now
        }, 2000);
    });
}
