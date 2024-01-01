let startTime;
let running = false;
let lapCount = 1;
let lapStartTime;

const timerElement = document.getElementById('timer');
const lapListElement = document.getElementById('lapList');

function startTimer() {
  if (!running) {
    startTime = Date.now() - (lapCount > 1 ? lapStartTime : 0);
    running = true;
    lapStartTime = Date.now();
    updateTimer();
  }
}

function pauseTimer() {
  if (running) {
    running = false;
    lapStartTime = null;
  }
}

function resetTimer() {
  running = false;
  lapCount = 1;
  lapStartTime = null;
  timerElement.querySelector('.time').textContent = '00:00:00';
  lapListElement.innerHTML = '';
}

function lap() {
  if (running) {
    const elapsedMilliseconds = Date.now() - lapStartTime;
    const formattedTime = formatTime(elapsedMilliseconds);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount++}: ${formattedTime}`;
    lapListElement.appendChild(lapItem);
    lapStartTime = Date.now();
  }
}

function updateTimer() {
  if (running) {
    const elapsedMilliseconds = Date.now() - startTime;
    const formattedTime = formatTime(elapsedMilliseconds);
    timerElement.querySelector('.time').textContent = formattedTime;
  }
  requestAnimationFrame(updateTimer);
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('lapBtn').addEventListener('click', lap);
