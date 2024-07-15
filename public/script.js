const imageGallery = document.querySelector('.image-gallery');
const imageSelect = document.querySelector('#image-select');
const resizeForm = document.querySelector('.resize-form form');
const resizedUrl = document.querySelector('.resized-url');
const uploadForm = document.querySelector('.upload-form form');
const uploadMessage = document.querySelector('.upload-message');

// Fetch available images and display them in the gallery
async function fetchImages() {
  try {
    const response = await fetch('http://localhost:8000/api/images');
    const data = await response.json();
    data.forEach((image) => {
      const img = document.createElement('img');
      img.src = `http://localhost:8000/images/original/${image}`; // Path for original images
      img.alt = image;
      img.addEventListener('click', () => {
        imageSelect.value = image;
      });
      imageGallery.appendChild(img);

      const option = document.createElement('option');
      option.value = image;
      option.textContent = image;
      imageSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

// Handle resize form submission
async function handleResize(event) {
  event.preventDefault();
  const imageName = imageSelect.value;
  const width = document.querySelector('#width').value;
  const height = document.querySelector('#height').value;

  // Check if width and height are valid
  if (!imageName || !width || !height) {
    alert('Please select an image and enter both width and height.');
    return;
  }

  // Construct the URL for the resized image
  const url = `http://localhost:8000/images/thumbnails/${imageName}?w=${width}&h=${height}`;

  // Display the resized image URL
  resizedUrl.innerHTML = `Resized image URL: <a href="${url}" target="_blank">${url}</a>`;

  // Open the resized image in a new tab
  window.open(url, '_blank');

  // Reset the form fields
  document.querySelector('#width').value = '';
  document.querySelector('#height').value = '';
}

// Handle upload form submission
async function handleUpload(event) {
  event.preventDefault();

  const fileInput = document.querySelector('#fileInput');
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('image', file);
  try {
    const response = await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      uploadMessage.textContent = 'Image uploaded successfully';
      imageGallery.innerHTML = '';
      imageSelect.innerHTML = '';
      fetchImages();
    } else {
      uploadMessage.textContent = 'Error uploading image';
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    uploadMessage.textContent = 'Error uploading image';
  }
}

fetchImages();
resizeForm.addEventListener('submit', handleResize);
uploadForm.addEventListener('submit', handleUpload);
