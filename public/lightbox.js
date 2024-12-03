document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.work-grid img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close');

    // Open lightbox on image click
    images.forEach(img => {
        img.addEventListener('click', () => {
            const fullsizeSrc = img.getAttribute('data-fullsize');
            lightboxImg.src = fullsizeSrc; // Set the lightbox image source
            lightbox.style.display = 'flex'; // Show the lightbox
        });
    });

    // Close lightbox on close button click
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none'; // Hide the lightbox
    });

    // Optional: Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});
