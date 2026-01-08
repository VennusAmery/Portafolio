document.addEventListener("DOMContentLoaded", () => {
    // Elementos del visor
    const photoViewer = document.getElementById("photoViewer");
    const activePhoto = document.getElementById("activePhoto");
    const closePhoto = document.getElementById("closePhoto");
    const btnMaximize = document.getElementById("btn-maximize-photo"); 
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const cards = document.querySelectorAll(".pdf-card");

    let images = [];
    let currentIndex = 0;
    let isMaximized = false;

    // Cargar lista de imágenes
    cards.forEach((card, index) => {
        const img = card.querySelector("img");
        if (img) {
            images.push(img.src);
            card.addEventListener("click", () => {
                currentIndex = index;
                activePhoto.src = images[currentIndex];
                photoViewer.style.display = "flex";
            });
        }
    });

    // MAXIMIZA
    if (btnMaximize && photoViewer) {
        btnMaximize.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isMaximized) {
                photoViewer.style.position = "fixed";
                photoViewer.style.top = "0";
                photoViewer.style.left = "0";
                photoViewer.style.transform = "none"; 
                photoViewer.style.width = "100vw";
                photoViewer.style.height = "calc(100vh - 35px)";
                photoViewer.style.zIndex = "1000";
                photoViewer.style.margin = "0";
                isMaximized = true;
            } else {
                photoViewer.style.position = "absolute";
                photoViewer.style.top = "50%";
                photoViewer.style.left = "50%";
                photoViewer.style.transform = "translate(-50%, -50%)";
                photoViewer.style.width = "90%";
                photoViewer.style.height = "85%";
                isMaximized = false;
            }
        });
    }

    // Navegación
    nextBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        activePhoto.src = images[currentIndex];
    });

    prevBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        activePhoto.src = images[currentIndex];
    });

    closePhoto?.addEventListener("click", () => {
        photoViewer.style.display = "none";
        if (isMaximized) btnMaximize.click();
    });
});

// Bloquear clic derecho en toda la página
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
}, false);

// Bloquear el arrastre de la imagen 
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
}, false);