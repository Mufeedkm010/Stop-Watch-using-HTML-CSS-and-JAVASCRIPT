let startTime, updatedTime, difference = 0, timerInterval;
let running = false;

window.onload = function() {
    const display = document.querySelector('.display');
    const lapsList = document.getElementById('lapsList');

    document.getElementById('start').addEventListener('click', function() {
        if (!running) {
            startTime = new Date().getTime() - difference;
            timerInterval = setInterval(updateTime, 1000);
            running = true;
        }
    });

    document.getElementById('lap').addEventListener('click', function() {
        if (running) {
            const lapTime = display.textContent;
            const lapItem = document.createElement('li');
            lapItem.textContent = lapTime;
            lapsList.appendChild(lapItem);
        }
    });

    document.getElementById('stop').addEventListener('click', function() {
        if (running) {
            clearInterval(timerInterval);
            running = false;
        }
    });

    document.getElementById('reset').addEventListener('click', function() {
        clearInterval(timerInterval);
        running = false;
        difference = 0;
        display.textContent = '00:00:00';
        lapsList.innerHTML = '';
    });

    function updateTime() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;
        
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    function pad(number) {
        return number < 10 ? '0' + number : number;
    }
}
