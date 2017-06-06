/* Get our elements from the page */

const player = document.querySelector('.player');
const video = player.querySelector('video');

const progress    = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const play    = player.querySelector('.toggle');
const sliders = player.querySelectorAll('input[type="range"]');

const skips = player.querySelectorAll('button[data-skip]');

const fullScreen = document.querySelector('#fullScreen');

let mouseDown = false;

/* Build up the functions */

function togglePlay() {
    video[ video.paused ? 'play' : 'pause' ]();
}

// We keep this separate from the togglePlay so that other methods that cause the
//  video to play will accurately update the button (e.g., calling play from the console)
function updateButton() {
    play.textContent = this.paused ? '►' : '❚ ❚'
}

function handleSkip() {
    if (video.paused) return;
    video.currentTime = video.currentTime + parseInt(this.dataset.skip);
}

function handleRange() {
    if (!mouseDown) return;
    video[this.name] = this.value;
}

function handleProgress() {
    progressBar.style.flexBasis = `${100 * (video.currentTime/video.duration)}%`;
}

function handleScrub(e) {
    // This is now handled on 'mousemove', instead.
    // if (e.type === 'mousemove' && !mouseDown) return;
    console.log(this);
    video.currentTime = (e.offsetX/progress.offsetWidth) * video.duration;
}

function handleFullscreen() {
    // SOURCE: https://www.sitepoint.com/use-html5-full-screen-api/
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}


/* Hook up the event listeners */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

play.addEventListener('click', togglePlay);

sliders.forEach(slider => slider.addEventListener('mousemove', handleRange));

skips.forEach(skip => skip.addEventListener('click', handleSkip));

progress.addEventListener('click',     handleScrub);
progress.addEventListener('mousemove', (e) => mouseDown && handleScrub(e));

document.addEventListener('mousedown', () => mouseDown = true);
document.addEventListener('mouseup',   () => mouseDown = false);

fullScreen.addEventListener('click', handleFullscreen);
