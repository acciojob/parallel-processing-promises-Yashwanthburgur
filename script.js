// Get DOM elements
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const error = document.getElementById("error");
const spinner = document.getElementById("spinner");

// Image data
const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(imgObj) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
            resolve(img);
        };
        
        img.onerror = () => {
            reject(`Failed to load image's URL: ${imgObj.url}`);
        };
        
        img.src = imgObj.url;
    });
}

// Function to download all images
function downloadAllImages() {
    // Show loading spinner
    spinner.style.display = 'block';
    
    // Clear previous content
    output.innerHTML = '';
    error.textContent = '';
    
    // Create array of promises for each image
    const promises = images.map(img => downloadImage(img));
    
    // Download all images in parallel
    Promise.all(promises)
        .then(loadedImages => {
            // Hide spinner
            spinner.style.display = 'none';
            
            // Display each image
            loadedImages.forEach(img => {
                output.appendChild(img);
            });
        })
        .catch(err => {
            // Hide spinner
            spinner.style.display = 'none';
            
            // Show error message
            error.textContent = err;
        });
}
// Add click event listener to button
btn.addEventListener('click', downloadAllImages);