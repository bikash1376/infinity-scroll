const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
const themeEl = document.getElementById("themebtn");
const titleEl = document.getElementById("title");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



function themeChanger() {
  console.log("calling");
  if (themeEl.innerText == "dark") {
    document.body.style.backgroundColor = "#050505";
    titleEl.style.color = "whitesmoke";
    themeEl.textContent = "light";
    themeEl.style.color = "#050505";
    themeEl.style.backgroundColor = "whitesmoke";
  }
   else if (themeEl.innerText == "light") {
    document.body.style.backgroundColor = "whitesmoke";
    titleEl.style.color = "#050505";
    themeEl.style.color = "whitesmoke";
    themeEl.style.backgroundColor = "#050505";
    themeEl.innerText = "dark";
  }
}










// Unsplash API

const count = 30;
const apiKey = "";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements fo links, photos and add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // put <img> instide <a> then and then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
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

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
// On Load
getPhotos();
