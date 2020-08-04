const prev_btn = document.getElementById("prev");
const play_btn = document.getElementById("play");
const next_btn = document.getElementById("next");

const music_container = document.getElementById("music-container");
const cover = document.getElementById("cover");
const title = document.getElementById("title");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progress_container = document.getElementById("progress-container");

const songs = ["hey", "summer", "ukulele"];

let songIndex = 2;

//Initially load Song
loadsong(songs[songIndex]);

//Functions
function loadsong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  music_container.classList.add("play");
  play_btn.querySelector("i.fas").classList.remove("fa-play");
  play_btn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  music_container.classList.remove("play");
  play_btn.querySelector("i.fas").classList.remove("fa-pause");
  play_btn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

function nextSong() {
  if (songIndex == songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  loadsong(songs[songIndex]);
  playSong();
  //   const isPlaying = music_container.classList.contains("play");

  //   if (isPlaying) {
  //     playSong();
  //   } else {
  //     pauseSong();
  //   }
  //hi
}

function prevSong() {
  if (songIndex == 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex -= 1;
  }
  loadsong(songs[songIndex]);
  playSong();
  //   const isPlaying = music_container.classList.contains("play");

  //   if (isPlaying) {
  //     playSong();
  //   } else {
  //     pauseSong();
  //   }
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

//Event Listeners
next_btn.addEventListener("click", nextSong);
prev_btn.addEventListener("click", prevSong);
play_btn.addEventListener("click", () => {
  const isPlaying = music_container.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

audio.addEventListener("timeupdate", updateProgress);

progress_container.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);
