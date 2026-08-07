"use strict";

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
];

const button = document.querySelector("#playButton");
const nsfwSwitch = document.querySelector("#nsfw-switch");
const labelSwitch = document.querySelector("#switch-label");
const audioList = document.querySelector("#audio-list");
const homeScreen = document.querySelector("#home-screen");
const libraryScreen = document.querySelector("#library-screen");
const homeTab = document.querySelector("#home-tab");
const libraryTab = document.querySelector("#library-tab");
const safeTab = document.querySelector("#safe-tab");
const nsfwTab = document.querySelector("#nsfw-tab");
const librarySearch = document.querySelector("#library-search");
const libraryCount = document.querySelector("#library-count");
const settingsButton = document.querySelector("#settings-button");
const settingsPanel = document.querySelector("#settings-panel");
const settingsBackdrop = document.querySelector("#settings-backdrop");
const homeModeLabel = document.querySelector("#home-mode-label");
const modeDot = document.querySelector("#mode-dot");
const recentCard = document.querySelector("#recent-card");
const recentName = document.querySelector("#recent-name");
const recentState = document.querySelector("#recent-state");
const playLabel = document.querySelector("#play-label");

let currentAudio = null;
let currentFile = null;
let messageTimeout = null;

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
  playLabel.textContent = message;

  messageTimeout = window.setTimeout(() => {
    playLabel.textContent = "Tap to Tafazzi";
  }, duration);
}

function updatePlayingItem() {
  document.querySelectorAll(".audio-item").forEach(item => {
    item.classList.toggle("playing-item", item.dataset.path === currentFile?.path && !currentAudio?.paused);
  });
}

function playAudio(file, audioData = allMp3Files.find(item => item.path === file)) {
  currentAudio?.pause();

  currentFile = audioData || { path: file, name: file.split("/").pop() };
  currentAudio = new Audio(file);

  currentAudio.addEventListener(
    "ended",
    () => {
      button.classList.remove("playing");
      recentState.textContent = "Riproduzione terminata";
      updatePlayingItem();
    },
    { once: true }
  );

  button.classList.add("playing");
  recentName.textContent = currentFile.name;
  recentState.textContent = currentFile.safe === false ? "NOT SAFE" : "SAFE";
  currentAudio.play();
  updatePlayingItem();
}

async function playRandomMp3() {
  if (allMp3Files.length === 0) {
    showTemporaryMessage("Nessun MP3 configurato");
    return;
  }

  button.disabled = true;

  try {
    currentAudio?.pause();

    const files = allMp3Files.filter(audio =>
      nsfwSwitch.checked
        ? audio.safe === false
        : audio.safe === true
    );

    if (files.length === 0) {
      showTemporaryMessage("Nessun MP3 configurato");
      return;
    }

    const selectedFile = files[randomIndex(files.length)];
    playAudio(selectedFile.path, selectedFile);
  } catch (error) {
    console.error(error);
    showTemporaryMessage("Impossibile riprodurre l'audio");
  } finally {
    button.disabled = false;
  }
}

function syncModeUI() {
  const isNsfw = nsfwSwitch.checked;

  labelSwitch.textContent = isNsfw ? "NOT SAFE" : "SAFE";
  labelSwitch.className = isNsfw
    ? "rounded-full bg-rose-100 px-3 py-1.5 text-[11px] font-black text-rose-700"
    : "rounded-full bg-emerald-100 px-3 py-1.5 text-[11px] font-black text-emerald-700";

  homeModeLabel.textContent = isNsfw ? "NOT SAFE MODE" : "SAFE MODE";
  modeDot.className = isNsfw
    ? "h-2 w-2 rounded-full bg-rose-300"
    : "h-2 w-2 rounded-full bg-emerald-300";

  safeTab.classList.toggle("active", !isNsfw);
  nsfwTab.classList.toggle("active", isNsfw);

  renderAudioList();
}

function setMode(isNsfw) {
  nsfwSwitch.checked = isNsfw;
  nsfwSwitch.dispatchEvent(new Event("change"));
}

function renderAudioList() {
  const query = librarySearch.value.trim().toLowerCase();
  const isNsfw = nsfwSwitch.checked;

  const files = allMp3Files.filter(audio => {
    const sameMode = isNsfw ? audio.safe === false : audio.safe === true;
    const matchesQuery = audio.name.toLowerCase().includes(query);
    return sameMode && matchesQuery;
  });

  audioList.replaceChildren();
  libraryCount.textContent = `${files.length} audio`;

  if (files.length === 0) {
    const empty = document.createElement("div");
    empty.className = "rounded-[18px] bg-white/10 px-4 py-8 text-center text-[12px] font-semibold text-white/55";
    empty.textContent = "Nessun audio trovato";
    audioList.appendChild(empty);
    return;
  }

  files.forEach(audio => {
    const item = document.createElement("button");
    item.type = "button";
    item.dataset.path = audio.path;
    item.className = "audio-item flex w-full items-center gap-3 rounded-[18px] border border-white/10 bg-white/10 p-2.5 text-left backdrop-blur-xl transition hover:bg-white/16 active:scale-[.99]";

    const icon = document.createElement("span");
    icon.className = "grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-white/85 text-[#2860e7] shadow-md";
    icon.innerHTML = '<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true"><path d="M9 18V5l11-2v13a3.5 3.5 0 1 1-2-3.16V7.2l-7 1.27V18a3.5 3.5 0 1 1-2-3.16Z"/></svg>';

    const text = document.createElement("span");
    text.className = "min-w-0 flex-1";

    const title = document.createElement("span");
    title.className = "block truncate text-[13px] font-black text-white";
    title.textContent = audio.name;

    const meta = document.createElement("span");
    meta.className = "mt-0.5 block text-[10px] font-semibold text-white/55";
    meta.textContent = audio.key ? `Scorciatoia: ${audio.key.toUpperCase()}` : (audio.safe ? "SAFE" : "NOT SAFE");

    text.append(title, meta);

    const chevron = document.createElement("span");
    chevron.className = "text-lg font-black text-white/45";
    chevron.textContent = "›";

    item.append(icon, text, chevron);
    item.addEventListener("click", () => playAudio(audio.path, audio));
    audioList.appendChild(item);
  });

  updatePlayingItem();
}

function showScreen(screen) {
  const showHome = screen === "home";
  homeScreen.classList.toggle("hidden", !showHome);
  homeScreen.classList.toggle("flex", showHome);
  libraryScreen.classList.toggle("hidden", showHome);
  libraryScreen.classList.toggle("flex", !showHome);
  homeTab.classList.toggle("active", showHome);
  libraryTab.classList.toggle("active", !showHome);

  if (!showHome) {
    renderAudioList();
  }
}

function openSettings() {
  settingsPanel.classList.add("open");
}

function closeSettings() {
  settingsPanel.classList.remove("open");
}

// Keybinding del tasto random
document.body.addEventListener("keydown", function (event) {
  if (event.code === "Enter" && document.activeElement?.tagName !== "INPUT") {
    playRandomMp3();
  }
});

// Per ciascun audio, faccio il keybinding se presente
allMp3Files.forEach(audio => {
  if ("key" in audio && (audio.key != "" || audio.key != null)) {
    document.body.addEventListener("keydown", function (event) {
      if (document.activeElement?.tagName === "INPUT") return;
      if (event.key === audio.key) {
        playAudio(audio.path, audio);
      }
    });
  }
});

// Safe switch
nsfwSwitch.addEventListener("change", syncModeUI);

button.addEventListener("click", playRandomMp3);
homeTab.addEventListener("click", () => showScreen("home"));
libraryTab.addEventListener("click", () => showScreen("library"));
safeTab.addEventListener("click", () => setMode(false));
nsfwTab.addEventListener("click", () => setMode(true));
librarySearch.addEventListener("input", renderAudioList);
settingsButton.addEventListener("click", openSettings);
settingsBackdrop.addEventListener("click", closeSettings);

recentCard.addEventListener("click", () => {
  if (currentFile) {
    playAudio(currentFile.path, currentFile);
  }
});

syncModeUI();
showScreen("home");
