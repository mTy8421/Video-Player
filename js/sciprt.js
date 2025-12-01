// เลือก Elements
const container = document.getElementById("videoContainer");
const video = document.getElementById("mainVideo");
const playPauseBtn = document.getElementById("playPauseBtn");
const centerPlayBtn = document.getElementById("centerPlayBtn");
const progressArea = document.getElementById("progressArea");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");
const muteBtn = document.getElementById("muteBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const timeDisplay = document.getElementById("timeDisplay");

// Icons
const iconPlay = document.querySelector(".icon-play");
const iconPause = document.querySelector(".icon-pause");
const iconVolHigh = document.querySelector(".icon-vol-high");
const iconVolMute = document.querySelector(".icon-vol-mute");

// ฟังก์ชัน Toggle Play/Pause
function togglePlay() {
  if (video.paused) {
    video.play();
    container.classList.remove("paused");
    iconPlay.style.display = "none";
    iconPause.style.display = "block";
  } else {
    video.pause();
    container.classList.add("paused");
    iconPlay.style.display = "block";
    iconPause.style.display = "none";
  }
}

// Event Listeners สำหรับการเล่น
playPauseBtn.addEventListener("click", togglePlay);
centerPlayBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

// Update เวลาและ Progress Bar
video.addEventListener("timeupdate", (e) => {
  let currentTime = e.target.currentTime;
  let duration = e.target.duration;

  // อัปเดตความยาวแถบ
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  // อัปเดตตัวเลขเวลา
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) currentSec = `0${currentSec}`;

  let totalMin = Math.floor(duration / 60);
  let totalSec = Math.floor(duration % 60);
  if (totalSec < 10) totalSec = `0${totalSec}`;

  // ป้องกัน NaN ขณะโหลด
  if (duration) {
    timeDisplay.innerText = `${currentMin}:${currentSec} / ${totalMin}:${totalSec}`;
  }
});

// คลิกที่ Progress Bar เพื่อข้ามเวลา (Seek)
progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth; // ความกว้างทั้งหมด
  let clickedOffsetX = e.offsetX; // ตำแหน่งที่คลิก
  let songDuration = video.duration; // ความยาววิดีโอ

  video.currentTime = (clickedOffsetX / progressWidth) * songDuration;
});

// ปรับเสียง
volumeSlider.addEventListener("input", (e) => {
  video.volume = e.target.value;
  updateVolumeIcon();
});

// ปิดเสียง (Mute)
muteBtn.addEventListener("click", () => {
  if (video.volume > 0) {
    video.dataset.volume = video.volume; // เก็บค่าเดิมไว้
    video.volume = 0;
    volumeSlider.value = 0;
  } else {
    video.volume = video.dataset.volume || 1;
    volumeSlider.value = video.volume;
  }
  updateVolumeIcon();
});

function updateVolumeIcon() {
  if (video.volume === 0) {
    iconVolHigh.style.display = "none";
    iconVolMute.style.display = "block";
  } else {
    iconVolHigh.style.display = "block";
    iconVolMute.style.display = "none";
  }
}

// Fullscreen
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    container.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// กด Spacebar เพื่อ Play/Pause
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault(); // ป้องกันหน้าเลื่อน
    togglePlay();
  }
});
