
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

let intervalId;

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

function cambiarColor() {
    intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
    }, 1000);
}

function stopColor() {
    clearInterval(intervalId);
}

startButton.addEventListener('click', cambiarColor);
stopButton.addEventListener('click', stopColor);