// setting the search bar animation

const searchbox = document.querySelector(".searchbox");
const searchButton = document.querySelector(".searchButton");
const search = document.querySelector(".search");

searchButton.addEventListener("click", function () {
  console.log(search.classList.contains("active"));
  if (search.classList.contains("active")) {
    searchbox.value = "";
    search.classList.remove("active");
  } else {
    search.classList.add("active");
    searchbox.focus();
  }
});

// array of object -> using object as key : "value" pair

let songindex = 0;
let songs = [
  {
    name: "Late At Night",
    audioPath: "audio/song1.mp3",
    coverPath: "images/song1.png",
  },
  {
    name: "The Rocks",
    audioPath: "audio/song2.mp3",
    coverPath: "images/song2.png",
  },
  {
    name: "Keep You",
    audioPath: "audio/song3.mp3",
    coverPath: "images/song3.png",
  },
  {
    name: "Set You Free",
    audioPath: "audio/song4.mp3",
    coverPath: "images/song4.png",
  },
  {
    name: "Calling Out Your Name",
    audioPath: "audio/song5.mp3",
    coverPath: "images/song5.png",
  },
  { name: "SUN", audioPath: "audio/song6.mp3", coverPath: "images/song6.png" },
  {
    name: "Never Let You Down",
    audioPath: "audio/song7.mp3",
    coverPath: "images/song7.png",
  },
  {
    name: "Pull Me in",
    audioPath: "audio/song8.mp3",
    coverPath: "images/song8.png",
  },
  {
    name: "who am I?",
    audioPath: "audio/song9.mp3",
    coverPath: "images/song9.png",
  },
];

let currentSong = new Audio("audio/song1.mp3");
let playButton = document.getElementById("playButton");
let playingGif = document.getElementById("playingGif");
let ProgressBar = document.getElementById("songProgressBar");
let timedisplay = document.getElementById("timestampDisplay");
let songTitle = document.getElementById("songTitle");

// playing and pausing the song
playButton.addEventListener("click", () => {
  if (currentSong.paused || currentSong.currentTime == 0) {
    currentSong.play();
    playButton.classList.remove("fa-circle-play");
    playButton.classList.add("fa-circle-pause");
    playingGif.style.opacity = 1;
  } else {
    currentSong.pause();
    playButton.classList.remove("fa-circle-pause");
    playButton.classList.add("fa-circle-play");
    playingGif.style.opacity = 0;
  }
});

// playing the gif by default when the song is playing

currentSong.addEventListener("timeupdate", () => {
  if (currentSong.currentTime == 0 || currentSong.paused) {
    playingGif.style.opacity = 0;
  } else {
    playingGif.style.opacity = 1;
  }
});

// converting the time format of the song to minustes:seconds
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedTime =
    minutes.toString().padStart(2, "0") +
    ":" +
    remainingSeconds.toString().padStart(2, "0");
  return formattedTime;
}

// updating the progress bar as the song is playing

// -> The timeupdate event is fired when the time indicated by the currentTime attribute has been updated.

currentSong.addEventListener("timeupdate", () => {
  ProgressBar.value = parseFloat(
    (currentSong.currentTime / currentSong.duration) * 100
  );

  // updating display of timestamp

  timedisplay.innerText =
    formatTime(currentSong.currentTime) +
    " / " +
    formatTime(currentSong.duration);

  // turning of the gif after the song has ended
  if (currentSong.currentTime == currentSong.duration) {
    playingGif.style.opacity = 0;
  }

  // changing pause button to restart after the song has ended
});

// controlling the time stamp of the song by using the progress bar

ProgressBar.addEventListener("input", () => {
  currentSong.currentTime =
    parseFloat(ProgressBar.value / 100) * currentSong.duration;

  // updating display of timestamp

  timedisplay.innerText =
    formatTime((ProgressBar.value / 100) * currentSong.duration) +
    " / " +
    formatTime(currentSong.duration);

  // turning of the gif
  if (currentSong.currentTime == currentSong.duration) {
    playingGif.style.opacity = 0;
  }
});
// playing the songs individually

// -> setting all songs to pause before playing a new song

function makeAllPlay() {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlay();

      // target retaurns the element where the event occured
      songindex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");

      // ${__}  is used to embed expression into stringLiterals  and ` ` is used instead of "" for this purpose

      // src attribute is used to assign or access source of a media like audio , video
      currentSong.src = `audio/song${songindex + 1}.mp3`;
      currentSong.currentTime = 0;

      currentSong.play();

      playButton.classList.remove("fa-circle-play");
      playButton.classList.add("fa-circle-pause");

      songTitle.innerText = String(songs[songindex].name);
    });
  }
);

let TotalNoOfSongs = Array.from(
  document.getElementsByClassName("songItemPlay")
).length;

let previous = document.getElementById("previous");
let next = document.getElementById("next");

// play previous
previous.addEventListener("click", () => {
  if (songindex <= 0) {
    songindex = TotalNoOfSongs - 1;
  } else {
    songindex = songindex - 1;
  }

  let e = document.getElementById(String(songindex + 1));
  makeAllPlay();

  e.classList.remove("fa-play-circle");
  e.classList.add("fa-pause-circle");

  currentSong.src = `audio/song${songindex + 1}.mp3`;
  currentSong.currentTime = 0;

  currentSong.play();

  playButton.classList.remove("fa-circle-play");
  playButton.classList.add("fa-circle-pause");

  songTitle.innerText = String(songs[songindex].name);
});

//play next

next.addEventListener("click", () => {
  songindex = (songindex + 1) % TotalNoOfSongs;

  let e = document.getElementById(String(songindex + 1));
  makeAllPlay();

  e.classList.remove("fa-play-circle");
  e.classList.add("fa-pause-circle");

  currentSong.src = `audio/song${songindex + 1}.mp3`;
  currentSong.currentTime = 0;

  currentSong.play();

  playButton.classList.remove("fa-circle-play");
  playButton.classList.add("fa-circle-pause");

  songTitle.innerText = String(songs[songindex].name);
});
