// get element

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider')

// built functin

function togglePlay(){
    const method = video.paused ?  'play': 'pause';
    video[method]();
//     if(video.paused){
//         video.play();
//     }
//     else{
//         video.pause();
//     }
// }
}

function updateButton(){
    const icon = this.paused ? '►' : '❚❚';
    console.log(icon);
    toggle.textContent = icon;
}

function skip(){
    // console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip);
}

//for chenge the value for volume or playback
function handleRangeUpdate(){

    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
}

function handleProgress(){
    const percent = (video.currentTime/ video.duration * 100);
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
//hook event

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress); //hear for progress bar update


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => 
    button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('click', handleRangeUpdate));

let mouseDown  = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mouseDown && scrub(e)); //if mouseDOwn is true since it bool
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
