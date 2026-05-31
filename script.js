const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let musicErrorShown = false;

bgMusic.addEventListener("error", () => {
  musicBtn.textContent = "No encuentro la música ⚠️";
  if (!musicErrorShown) {
    musicErrorShown = true;
    alert("No encuentro la canción. Revisa que el archivo esté exactamente en: assets/music/nuestra-cancion.mp3");
  }
});

musicBtn.addEventListener("click", async () => {
  try {
    bgMusic.volume = 0.55;

    if (bgMusic.paused) {
      bgMusic.load();
      await bgMusic.play();
      musicBtn.textContent = "Pausar música 💞";
    } else {
      bgMusic.pause();
      musicBtn.textContent = "Play música 🎵";
    }
  } catch (error) {
    musicBtn.textContent = "No encuentro la música ⚠️";
    alert(
      "No pude reproducir la canción.\n\n" +
      "Verifica esto:\n" +
      "1. La canción debe estar dentro de: assets/music/\n" +
      "2. Debe llamarse exactamente: nuestra-cancion.mp3\n" +
      "3. Ojo: que no quede como nuestra-cancion.mp3.mp3\n" +
      "4. Ábrelo con Live Server, no solo doble clic."
    );
  }
});

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseText = document.getElementById("surpriseText");

surpriseBtn.addEventListener("click", () => {
  surpriseText.classList.toggle("show");
  surpriseBtn.textContent = surpriseText.classList.contains("show")
    ? "Siempre te elegiré ❤️"
    : "Toca aquí, mi amor 🦋";
});

const petalsContainer = document.getElementById("petals");
const symbols = ["♥", "♡", "🦋", "💕", "❤"];

function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.fontSize = (Math.random() * 18 + 14) + "px";
  petal.style.animationDuration = (Math.random() * 5 + 6) + "s";
  petal.style.color = Math.random() > 0.5 ? "#7b1e35" : "#c55a73";
  petalsContainer.appendChild(petal);

  setTimeout(() => petal.remove(), 11000);
}

setInterval(createPetal, 650);
