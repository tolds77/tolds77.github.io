document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.work-grid img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close');

  
    images.forEach(img => {
        img.addEventListener('click', () => {
            const fullsizeSrc = img.getAttribute('data-fullsize');
            lightboxImg.src = fullsizeSrc; 
            lightbox.style.display = 'flex'; 
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none'; 
    });

 
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxDesc = document.getElementById("lightbox-desc");

function openLightbox(imgSrc, description) {
    lightboxImg.src = imgSrc; 
    lightboxDesc.textContent = description; 
    lightbox.style.display = "flex"; 
}

function closeLightbox() {
    lightbox.style.display = "none"; 
    lightboxImg.src = ""; 
    lightboxDesc.textContent = ""; 
}