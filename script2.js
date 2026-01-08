const modal = document.getElementById("projectModal");
const closeBtn = document.getElementById("closeProject");

const title = document.getElementById("projectTitle");
const desc = document.getElementById("projectDesc");
const time = document.getElementById("projectTime");
const end = document.getElementById("projectEnd");
const team = document.getElementById("projectTeam");
const projectTec = document.getElementById("projectTec");

const img = document.getElementById("carouselImg");
const prev = document.getElementById("prevImg");
const next = document.getElementById("nextImg");

const repo = document.getElementById("repoLink");
const page = document.getElementById("pageLink");

const projectCards = document.querySelectorAll('.project-card');
const pageLink = document.getElementById('pageLink');

let images = [];
let index = 0;

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    title.textContent = card.dataset.title;
    desc.textContent = card.dataset.desc;
    time.textContent = card.dataset.time;
    end.textContent = card.dataset.end;
    team.textContent = card.dataset.team;
    projectTec.textContent = card.dataset.tec;

    images = JSON.parse(card.dataset.images.replace(/\s+/g, ""));
    index = 0;
    img.src = images[index];

    repo.href = card.dataset.repo;
    page.href = card.dataset.page;

    modal.classList.add("active");
  });
});

prev.onclick = () => {
  index = (index - 1 + images.length) % images.length;
  img.src = images[index];
};

next.onclick = () => {
  index = (index + 1) % images.length;
  img.src = images[index];
};

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    modal.classList.remove("active");
  }
});

const closeButtons = document.querySelectorAll(".closeBtn");

closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    modal.classList.remove("active");
  });
});

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const urlPage = card.getAttribute('data-page');
        document.getElementById('repoLink').href = card.getAttribute('data-repo');

        if (!urlPage || urlPage.trim() === "") {
            // Si no hay link quitamos el href y añadimos la alerta
            pageLink.href = "javascript:void(0)"; 
            pageLink.onclick = function() {
                alert("Sitio web aún no disponible");
            };

            pageLink.style.opacity = "0.5";
        } else {

          pageLink.href = urlPage;
            pageLink.onclick = null; 
            pageLink.style.opacity = "1";
            pageLink.style.cursor = "pointer";
        }        
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