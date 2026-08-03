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
  ];

  const mp3Files = [
    "audio/rafeeele_short.mp3",
    "audio/carmine_short.mp3",
    "audio/vicie_short.mp3",
    "audio/fischio.mp3",
  ];

  const allMp3Files = [
    { path: "audio/rafele_long.mp3", name: "rafele_long", safe: false },
    { path: "audio/mmoccachitebbiv.mp3", name: "mmoccachitebbiv", safe: false },
    { path: "audio/raffele_perbene.mp3", name: "raffele_perbene", safe: false },
    { path: "audio/vivalafregna.mp3", name: "vivalafregna", safe: false },
    { path: "audio/carmine_long.mp3", name: "carmine_long", safe: false },
    { path: "audio/vicie_long.mp3", name: "vicie_long", safe: false },
    { path: "audio/fregna.mp3", name: "fregna", safe: false },
    { path: "audio/rafeeele_short.mp3", name: "rafeeele_short", safe: true },
    { path: "audio/carmine_short.mp3", name: "carmine_short", safe: true },
    { path: "audio/vicie_short.mp3", name: "vicie_short", safe: true },
    { path: "audio/fischio.mp3", name: "fischio", safe: true }
  ]

  const nav = document.querySelector("nav");
  const navToggle = document.querySelector("#nav-toggle");
  const button = document.querySelector("#playButton");
  const nsfwSwitch = document.querySelector("#nsfw-switch");
  const labelSwitch = document.querySelector("#switch-label");
  const audioList = document.getElementById("audio-list");

  allMp3Files.forEach(audio => {
    const item = document.createElement("div");
    item.style.cursor = "pointer";

    const name = document.createElement("button");
    name.textContent = audio.name;
    item.appendChild(name);

    if (!audio.safe) {
      const dot = document.createElement("span");
      name.insertAdjacentElement('beforeEnd', dot);
    }

    item.addEventListener("click", () => playAudio(audio.path));

    nav.querySelector(".inner").appendChild(item);
  });

  nsfwSwitch.addEventListener("change", () => {
    labelSwitch.innerText = nsfwSwitch.checked ? "NOT SAFE" : "SAFE";
  });



  navToggle.addEventListener("click", (e) => {
    nav.classList.toggle('-translate-y-full')
    document.body.classList.toggle('overflow-hidden')
    e.currentTarget.classList.toggle('active')
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