const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

const startBtn = document.getElementById("startBtn");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
const mainContent = document.getElementById("mainContent");
const hero = document.getElementById("inicio");

async function playMusic() {
  try {
    bgMusic.volume = 0.55;
    await bgMusic.play();
    if (musicBtn) musicBtn.textContent = "Pausar música 💞";
  } catch (error) {
    console.warn("No se pudo reproducir la música:", error);
  }
}

function startExperience() {
  playMusic();
  hero.classList.add("hero-exit");

  setTimeout(() => {
    hero.style.display = "none";
    mainContent.classList.add("show-main");
    window.scrollTo({ top: 0, behavior: "smooth" });

    document.querySelectorAll(".main-content .reveal").forEach((el, index) => {
      setTimeout(() => el.classList.add("show"), index * 100);
    });
  }, 650);
}

if (startBtn) {
  startBtn.addEventListener("click", startExperience);
}

if (musicBtn) {
  musicBtn.addEventListener("click", async () => {
    try {
      bgMusic.volume = 0.55;
      if (bgMusic.paused) {
        await bgMusic.play();
        musicBtn.textContent = "Pausar música 💞";
      } else {
        bgMusic.pause();
        musicBtn.textContent = "Play música 🎵";
      }
    } catch (error) {
      alert("No pude reproducir la canción. Revisa que esté en assets/music/nuestra-cancion.mp3");
    }
  });
}

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseText = document.getElementById("surpriseText");

if (surpriseBtn && surpriseText) {
  surpriseBtn.addEventListener("click", () => {
    surpriseText.classList.toggle("show");
    surpriseBtn.textContent = surpriseText.classList.contains("show")
      ? "Siempre te elegiré ❤️"
      : "Toca aquí, mi amor 🦋";
  });
}

const petalsContainer = document.getElementById("petals");
const symbols = ["♥", "♡", "🦋", "💕", "❤"];

function createPetal() {
  if (!petalsContainer) return;
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
