  const cards = document.querySelectorAll('.pdf-card');
  const pdfViewer = document.getElementById('pdfViewer');
  const closePdf = document.getElementById('closePdf');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const pdf = card.getAttribute('data-pdf');
      pdfViewer.src = pdf;
      pdfWindow.style.display = 'flex';
    });
  });

const pdfWindow = document.getElementById("pdfWindow");

document.querySelectorAll(".close-pdf").forEach(btn => {
  btn.addEventListener("click", () => {
    pdfWindow.style.display = "none";
  });
});

  closePdf.addEventListener('click', () => {
    pdfViewer.src = '';
    pdfWindow.style.display = 'none';
  });

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    modal.classList.remove("active");
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