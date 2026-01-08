window.onload = function() {
    const pdfjsLib = window['pdfjs-dist/build/pdf'] || window.pdfjsLib;

    if (!pdfjsLib) {
        console.error("La librería PDF.js no se cargó correctamente. Revisa la URL en tu HTML.");
        return;
    }

    // Worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const cards = document.querySelectorAll('.pdf-card');
    const pdfWindow = document.getElementById("pdfWindow");
    const pdfViewer = document.getElementById('pdfViewer');
    const btnMaximize = document.getElementById('btn-maximize');
    const mainWindow = document.querySelector('.main-window');
    const closePdf = document.getElementById('closePdf');
    const allCloseBtns = document.querySelectorAll(".close-pdf");

allCloseBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault(); 
        if (pdfViewer && pdfWindow) {
            pdfViewer.src = '';        
            pdfWindow.style.display = 'none'; 
        }
    });
});
    let isMaximized = false;

async function renderThumbnail(url, canvas) {
    const ctx = canvas.getContext('2d');
    
    canvas.width = 150; 
    canvas.height = 200;

    const icon = new Image();
    icon.src = 'img/pdf.png'; 
    icon.onload = () => {
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(icon, (canvas.width - 80) / 2, (canvas.height - 80) / 2, 80, 80);
    };

    try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        
        const viewport = page.getViewport({ scale: 1.5 }); 
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        await page.render(renderContext).promise;
        console.log("Miniatura lista:", url);
    } catch (error) {
        console.warn("Usando icono de respaldo para:", url);
    }
}

    // PROCESAR CADA card 
    cards.forEach(card => {
        const pdfUrl = card.getAttribute('data-pdf');
        const canvas = card.querySelector('.pdf-canvas');

        // Generar miniatura si hay canvas
        if (pdfUrl && canvas) {
            if (pdfUrl.toLowerCase().endsWith('.pdf')) {
                renderThumbnail(pdfUrl, canvas);
            } else {
                // Si es imagen dibujarla en el canvas
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.src = pdfUrl;
                img.onload = () => {
                    canvas.width = 150;
                    canvas.height = 200;
                    ctx.drawImage(img, 0, 0, 150, 200);
                };
            }
        }

card.addEventListener('click', () => {
    if (pdfViewer && pdfWindow) {
        const viewerUrl = `lib/pdfjs/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`;
        
        pdfViewer.src = viewerUrl;
        pdfWindow.style.display = 'flex';
    }
});
    });

    //  CERRAR VISOR 
    const cerrarVisor = (e) => {
        if (e) e.preventDefault();
        if (pdfViewer && pdfWindow) {
            pdfViewer.src = '';
            pdfWindow.style.display = 'none';
        }
    };

    allCloseBtns.forEach(btn => {
        btn.addEventListener("click", cerrarVisor);
    });

    //  MAXIMIZAR / MINIMIZAR 
    if (btnMaximize && (mainWindow || pdfWindow)) {
        const targetWindow = mainWindow || pdfWindow;

        btnMaximize.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isMaximized) {
                // Maximizar
                targetWindow.style.position = "fixed";
                targetWindow.style.top = "0";
                targetWindow.style.left = "0";
                targetWindow.style.transform = "none";
                targetWindow.style.width = "100vw";
                targetWindow.style.height = "calc(100vh - 35px)";
                targetWindow.style.zIndex = "1000";
                targetWindow.style.margin = "0";
                isMaximized = true;
            } else {
        // MINIMIZAR 
                mainWindow.style.position = "relative"; 
                mainWindow.style.width = ""; 
                mainWindow.style.height = ""; 
                mainWindow.style.top = "";
                mainWindow.style.left = "";
                mainWindow.style.margin = ""; 
                isMaximized = false;
            }
        });
    }
    // Tecla Escape para cerrar
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") cerrarVisor();
    });
};

document.querySelectorAll(".close-pdf").forEach(btn => {
  btn.addEventListener("click", () => {
    pdfWindow.style.display = "none";
  });
});

  closePdf.addEventListener('click', () => {
    pdfViewer.src = '';
    pdfWindow.style.display = 'none';
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