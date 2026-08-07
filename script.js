"use strict";

/*
 * Inserisci qui i percorsi dei file MP3.
 *
 * Sono ammessi:
 * - percorsi relativi: "audio/brano-1.mp3"
 * - percorsi assoluti: "/media/brano-2.mp3"
 * - URL completi: "https://example.com/brano-3.mp3"
 */
const nswf_mp3Files = [
  "audio/rafele_long.mp3",
  "audio/mmoccachitebbiv.mp3",
  "audio/raffele_perbene.mp3",
  "audio/vivalafregna.mp3",
  "audio/carmine_long.mp3",
  "audio/vicie_long.mp3",
  "audio/fregna.mp3",
  "audio/tuvaiafareichinotti.mp3",
  "audio/tuamammavaafareichinotti.mp3",
  "audio/losentiilpesce.mp3",
  "audio/vivalamerda.mp3",
  "audio/qualita.mp3",
  "audio/cagnamaledetta.mp3",
  "audio/cagnafattaefinita.mp3",
  "audio/edicsi.mp3",
  "audio/notelecamera.mp3",
];

const mp3Files = [
  "audio/rafeeele_short.mp3",
  "audio/carmine_short.mp3",
  "audio/vicie_short.mp3",
  "audio/fischio.mp3",
  "audio/gabinetti.mp3",
  "audio/maiochecazzoneso.mp3",
  "audio/monella_short.mp3",
  "audio/monella_long.mp3",
  "audio/tappo.mp3",
  "audio/doc.mp3",
  "audio/marooo.mp3",
  "audio/pittore.mp3",
  "audio/coffeebreak.mp3",
  "audio/simmsettott.mp3",
  "audio/meggappicciat.mp3",
  "audio/ibambin.mp3",
  "audio/nisciun.mp3",
  "audio/aggvistnurummor.mp3",
  "audio/ecomammafa.mp3",
  "audio/chillpovauln.mp3",
  "audio/farfuglio.mp3",
  "audio/benzinaelampi.mp3",
  "audio/ilimoni.mp3",
  "audio/teresa.mp3",
  "audio/fettinedivitello.mp3",

];

const allMp3Files = [
  { path: "audio/rafele_long.mp3", name: "rafele_long", safe: false, key: "a" },
  { path: "audio/mmoccachitebbiv.mp3", name: "mmoccachitebbiv", safe: false },
  { path: "audio/raffele_perbene.mp3", name: "raffele_perbene", safe: false, key: "r" },
  { path: "audio/vivalafregna.mp3", name: "vivalafregna", safe: false, key: "v" },
  { path: "audio/carmine_long.mp3", name: "carmine_long", safe: false },
  { path: "audio/vicie_long.mp3", name: "vicie_long", safe: false },
  { path: "audio/fregna.mp3", name: "fregna", safe: false },
  { path: "audio/rafeeele_short.mp3", name: "rafeeele_short", safe: true },
  { path: "audio/carmine_short.mp3", name: "carmine_short", safe: true, key: "c" },
  { path: "audio/vicie_short.mp3", name: "vicie_short", safe: true, key: "b" },
  { path: "audio/fischio.mp3", name: "fischio", safe: true, key: "f" },
  { path: "audio/gabinetti.mp3", name: "gabinetti", safe: true },
  { path: "audio/maiochecazzoneso.mp3", name: "maiochecazzoneso", safe: true },
  { path: "audio/tuvaiafareichinotti.mp3", name: "chinotti_short", safe: false, key: "k" },
  { path: "audio/tuamammavaafareichinotti.mp3", name: "tua mamma a vare", safe: false },
  { path: "audio/monella_short.mp3", name: "monella short", safe: true, key: "m" },
  { path: "audio/monella_long.mp3", name: "monella long", safe: true, key: "1" },
  { path: "audio/tappo.mp3", name: "tappo", safe: true },
  { path: "audio/doc.mp3", name: "doc!", safe: true },
  { path: "audio/marooo.mp3", name: "maroooo", safe: true },
  { path: "audio/losentiilpesce.mp3", name: "lo senti il pesce", safe: false },
  { path: "audio/pittore.mp3", name: "pittore", safe: true },
  { path: "audio/coffeebreak.mp3", name: "coffee break", safe: true },
  { path: "audio/vivalamerda.mp3", name: "viva la merda", safe: false },
  { path: "audio/qualita.mp3", name: "A noi la qualità", safe: false },
  { path: "audio/cagnamaledetta.mp3", name: "Cagna maledetta", safe: false },
  { path: "audio/cagnafattaefinita.mp3", name: "Cagna fatta e finita", safe: false },
  { path: "audio/edicsi.mp3", name: "E dic sì", safe: false },
  { path: "audio/simmsettott.mp3", name: "Sett ott e nuj", safe: true },
  { path: "audio/meggappicciat.mp3", name: "Megg appicciat", safe: true },
  { path: "audio/ibambin.mp3", name: "I bambæn", safe: true },
  { path: "audio/nisciun.mp3", name: "Nisciün", safe: true },
  { path: "audio/aggvistnurummor.mp3", name: "Agg vist nu rummor", safe: true },
  { path: "audio/ecomammafa.mp3", name: "E comm amma fæ", safe: true },
  { path: "audio/chillpovauln.mp3", name: "Chill po væuln", safe: true },
  { path: "audio/farfuglio.mp3", name: "Farfuglio", safe: true },
  { path: "audio/benzinaelampi.mp3", name: "Adda chiov benzin", safe: true },
  { path: "audio/ilimoni.mp3", name: "I limoni", safe: true },
  { path: "audio/notelecamera.mp3", name: "Noo telecamera", safe: false },
  { path: "audio/teresa.mp3", name: "Teresa", safe: true },
  { path: "audio/fettinedivitello.mp3", name: "Fettine di vitello", safe: true },
]

const nav = document.querySelector("nav");
const navToggle = document.querySelector("#nav-toggle");
const button = document.querySelector("#playButton");
const nsfwSwitch = document.querySelector("#nsfw-switch");
const labelSwitch = document.querySelector("#switch-label");
const audioList = document.getElementById("audio-list");

// Keybinding del tasto random 
document.body.addEventListener("keydown", function (event) {
  if (event.code === 'Enter') {
    playRandomMp3();
  }
});

// Creazione dei link nella nav
allMp3Files.forEach(audio => {
  const item = document.createElement("div");
  item.style.cursor = "pointer";

  const name = document.createElement("button");
  name.textContent = audio.name
  if ("key" in audio) {
    name.textContent += ' (' + audio.key.toUpperCase() + ')';
  }

  item.appendChild(name);

  if (!audio.safe) {
    const dot = document.createElement("span");
    name.insertAdjacentElement('beforeEnd', dot);
  }

  item.addEventListener("click", () => playAudio(audio.path));

  nav.appendChild(item);

  //Per ciascun nav item, faccio il keybinding se presente
  if ("key" in audio && (audio.key != '' || audio.key != null)) {
    document.body.addEventListener("keydown", function (event) {
      if (event.key === audio.key) {
        playAudio(audio.path);
      }
    });
  }

});


// Safe switch
nsfwSwitch.addEventListener("change", () => {
  labelSwitch.innerText = nsfwSwitch.checked ? "NOT SAFE" : "SAFE";
});


// Toggle di apertura menu
navToggle.addEventListener("click", (e) => {
  nav.classList.toggle('-translate-y-full');
  document.body.classList.toggle('nav-opened');
  e.currentTarget.classList.toggle('active');
});



let currentAudio = null;
let messageTimeout = null;

/**
 * Restituisce un indice casuale compreso tra 0 e length - 1.
 * Usa crypto.getRandomValues quando disponibile.
 */
function randomIndex(length) {
  if (!Number.isInteger(length) || length <= 0) {
    throw new RangeError("La lunghezza dell'array deve essere maggiore di zero.");
  }

  if (globalThis.crypto?.getRandomValues) {
    const values = new Uint32Array(1);
    const range = 0x100000000;
    const limit = Math.floor(range / length) * length;

    do {
      crypto.getRandomValues(values);
    } while (values[0] >= limit);

    return values[0] % length;
  }

  return Math.floor(Math.random() * length);
}


function showTemporaryMessage(message, duration = 3000) {
  window.clearTimeout(messageTimeout);
  button.textContent = message;

}

function playAudio(file) {
  currentAudio?.pause();

  currentAudio = new Audio(file);

  currentAudio.addEventListener(
    "ended",
    () => {
      button.classList.remove("playing");
    },
    { once: true }
  );

  button.classList.add("playing");
  currentAudio.play();
}

async function playRandomMp3() {
  if (mp3Files.length === 0) {
    showTemporaryMessage("Nessun MP3 configurato");
    return;
  }

  button.disabled = true;
  //button.textContent = "Caricamento…";


  try {
    currentAudio?.pause();

    const files = nsfwSwitch.checked ? nswf_mp3Files : mp3Files;

    if (files.length === 0) {
      showTemporaryMessage("Nessun MP3 configurato");
      return;
    }

    const selectedFile = files[randomIndex(files.length)];
    playAudio(selectedFile);

    //button.textContent = "Riproduci un altro MP3";
  } catch (error) {
    console.error(error);
    showTemporaryMessage("Impossibile riprodurre l'audio");
  } finally {
    button.disabled = false;

  }
}

button.addEventListener("click", playRandomMp3);