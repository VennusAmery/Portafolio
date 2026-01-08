const closeBtns = document.querySelectorAll('.close-pdf');
const mainWindow = document.querySelector('.main-window');
const pdfDiv = document.querySelector('.folder[data-pdf]');
const pdfWindow = document.getElementById('pdfWindow');
const pdfViewer = document.getElementById('pdfViewer');
const btnMaximize = document.getElementById('btn-maximize');
const btnClose = document.getElementById('btn-close');

let isMaximized = false;

btnMaximize.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!isMaximized) {
        // MAXIMIZAR
        pdfWindow.style.position = "fixed";
        pdfWindow.style.top = "0";
        pdfWindow.style.left = "0";
        pdfWindow.style.transform = "none"; 
        pdfWindow.style.width = "100vw";
        pdfWindow.style.height = "calc(100vh - 35px)";
        pdfWindow.style.zIndex = "1000";
        pdfWindow.style.margin = "0";
        isMaximized = true;
    } else {
        // MINIMIZAR 
        pdfWindow.style.position = "absolute"; 
        pdfWindow.style.top = "60%";           
        pdfWindow.style.left = "50%";        
        pdfWindow.style.transform = "translate(-50%, -50%)"; 
        pdfWindow.style.width = "85%";      
        pdfWindow.style.height = "100%";    
        pdfWindow.style.zIndex = "50";
        pdfWindow.style.margin = ""; 
        isMaximized = false;
    }
});

// cERRAR 
btnClose.addEventListener('click', () => {
    window.location.href = 'opciones.html'; 
});

pdfDiv.addEventListener('click', () => {
    const pdfPath = pdfDiv.getAttribute('data-pdf'); 
    pdfViewer.src = pdfPath; 
    pdfWindow.style.display = 'block'; 
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        pdfWindow.style.display = 'none'; 
        pdfViewer.src = ''; 
    });
});

pdfWindow.addEventListener('click', (e) => {
    if (e.target === pdfWindow) {
        pdfWindow.style.display = 'none';
        pdfViewer.src = '';
    }
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

