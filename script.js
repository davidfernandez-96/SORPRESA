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
  // Si agregas otra cancion, pon una coma arriba y agrega:
  // "assets/music/nuestra-cancion-3.mp3"
];

const playLabel = "Play m\u00fasica \ud83c\udfb5";
const pauseLabel = "Pausar m\u00fasica \ud83d\udc9e";
let currentSong = 0;
let isChangingSong = false;

function setMusicButton(isPlaying) {
  if (!musicBtn) return;
  musicBtn.textContent = isPlaying ? pauseLabel : playLabel;
}

function loadCurrentSong() {
  if (!bgMusic || playlist.length === 0) return;

  bgMusic.src = playlist[currentSong];
  bgMusic.load();
}

function moveToNextSong() {
  currentSong = (currentSong + 1) % playlist.length;
}

async function playLoadedSong() {
  if (!bgMusic || playlist.length === 0) return;

  bgMusic.volume = 0.55;

  if (!bgMusic.getAttribute("src")) {
    loadCurrentSong();
  }

  await bgMusic.play();
  setMusicButton(true);
}

async function playNextSong() {
  if (!bgMusic || playlist.length === 0 || isChangingSong) return;

  isChangingSong = true;
  moveToNextSong();
  loadCurrentSong();

  try {
    await playLoadedSong();
  } catch (error) {
    console.warn("No se pudo reproducir la siguiente cancion:", error);
    setMusicButton(false);
  } finally {
    isChangingSong = false;
  }
}

if (bgMusic && playlist.length > 0) {
  loadCurrentSong();

  /* Cuando termina una cancion, pasa a la siguiente.
     Cuando llega a la ultima, vuelve a empezar desde la primera. */
  bgMusic.addEventListener("ended", playNextSong);

  bgMusic.addEventListener("error", () => {
    console.warn("No se pudo cargar esta cancion:", playlist[currentSong]);
    playNextSong();
  });
}

async function playMusic() {
  try {
    await playLoadedSong();
  } catch (error) {
    console.warn("No se pudo reproducir la musica:", error);
    setMusicButton(false);
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
      if (bgMusic.paused) {
        await playLoadedSong();
      } else {
        bgMusic.pause();
        setMusicButton(false);
      }
    } catch (error) {
      setMusicButton(false);
      alert(
        "No pude reproducir la cancion. Revisa que las canciones esten en assets/music/ y que se llamen exactamente como en la playlist."
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
      ? "Siempre te elegir\u00e9 \u2764\ufe0f"
      : "Toca aqu\u00ed, mi amor \ud83e\udd8b";
  });
}

const petalsContainer = document.getElementById("petals");
const symbols = ["\u2665", "\u2661", "\ud83e\udd8b", "\ud83d\udc95", "\u2764"];

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
