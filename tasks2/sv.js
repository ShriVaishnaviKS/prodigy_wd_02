
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;
const display = document.getElementById('time-display');
const lapList = document.getElementById('lap-list');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = "00:00:00";
    lapList.innerHTML = "";
    lapCount = 0;
}

function lapStopwatch() {
    if (running) {
        lapCount++;
        const lapTime = new Date().getTime() - startTime;
        const formattedLapTime = formatTime(lapTime);
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerText = `Lap ${lapCount}: ${formattedLapTime}`;
        lapList.appendChild(lapItem);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

function formatTime(ms) {
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let seconds = Math.floor((ms / 1000) % 60);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
}

document.getElementById('start-btn').addEventListener('click', startStopwatch);
document.getElementById('pause-btn').addEventListener('click', pauseStopwatch);
document.getElementById('reset-btn').addEventListener('click', resetStopwatch);
document.getElementById('lap-btn').addEventListener('click', lapStopwatch);
