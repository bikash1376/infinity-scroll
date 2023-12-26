const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API

const count = 10;
const apiKey = "o3rzTqZk6S02nafTjpYBC9_baQL7SqyBfDVPqHoTg6I";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


// Cretae elements fo links, photos and add to DOM
function displayPhotos() {
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        
    })
}







// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
   displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}
// On Load
getPhotos();
