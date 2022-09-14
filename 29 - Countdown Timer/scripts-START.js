let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    //clear existing timer
    clearInterval(countdown);
    
    const now = Date.now();
    const then = now + seconds * 1000;
    countdown =  setInterval( () => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            //check to stop
            if(secondsLeft < 0){
                clearInterval(countdown);
                return;
            }
            displayTimeLeft(secondsLeft);
            displayTimeEnd(then);
        }, 1000);
    };

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayTimeEnd(timeStamp){
    document.title = 'Countdown Timer';
    const end = new Date(timeStamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at
     ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''} ${minutes}`;
}

function startTime(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTime));
document.customForm.addEventListener('submit', function(e){ // select form 
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});