const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle =player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
var width = 10;
// var id = setInterval(handleProgress, 10);
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
function updateButton(){
    // const icon =this.paused ? 'play' : 'pause';
    const icon =this.paused ? '▶' :  '⏯' ;
    toggle.textContent = icon;
}
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
    video[this.name] = this.value;
}
function handleProgress(){
    console.log(event);
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    // progressBar.style=' background-color: #4CAF50';
}
function scrub(){
console.log(event);
const scrubTime =(event.offsetX / progress.offsetWidth) * video.duration;
video.currentTime =scrubTime;
}
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
let mousedown= false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);