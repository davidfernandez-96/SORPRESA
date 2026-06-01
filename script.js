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

/* LISTA DE CANCIONES
   Coloca tus canciones en la carpeta:
   assets/music/

   Ejemplo:
   assets/music/nuestra-cancion.mp3
   assets/music/nuestra-cancion-2.mp3
*/
const playlist = [
  "assets/music/nuestra-cancion.mp3",
  "assets/music/nuestra-cancion-2.mp3"
  // Si agregas otra canción, pon una coma arriba y agrega:
  // "assets/music/nuestra-cancion-3.mp3"
];

let currentSong = 0;

if (bgMusic && playlist.length > 0) {
  bgMusic.src = playlist[currentSong];
}

/* Cuando termina una canción, pasa a la siguiente.
   Cuando llega a la última, vuelve a empezar desde la primera. */
if (bgMusic) {
  bgMusic.addEventListener("ended", async () => {
    currentSong++;

    if (currentSong >= playlist.length) {
      currentSong = 0;
    }

    bgMusic.src = playlist[currentSong];

    try {
      await bgMusic.play();
    } catch (error) {
      console.warn("No se pudo reproducir la siguiente canción:", error);
    }
  });
}

async function playMusic() {
  try {
    bgMusic.volume = 0.55;

    if (!bgMusic.src) {
      bgMusic.src = playlist[currentSong];
    }

    await bgMusic.play();

    if (musicBtn) {
      musicBtn.textContent = "Pausar música 💞";
    }
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

      if (!bgMusic.src) {
        bgMusic.src = playlist[currentSong];
      }

      if (bgMusic.paused) {
        await bgMusic.play();
        musicBtn.textContent = "Pausar música 💞";
      } else {
        bgMusic.pause();
        musicBtn.textContent = "Play música 🎵";
      }
    } catch (error) {
      alert(
        "No pude reproducir la canción. Revisa que las canciones estén en assets/music/ y que se llamen exactamente como en la playlist."
      );
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
