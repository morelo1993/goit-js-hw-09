import flatpickr from "flatpickr";
import Notiflix from "notiflix";

// funcion para convertir en formato dias horas minutos y segundos
function convertMs(ms) {
    let second, minute, hour, day, days, hours, minutes, seconds;
    second = 1000;
    minute = second * 60;
    hour = minute * 60;
    day = hour * 24;

    days = Math.floor(ms / day);
    hours = Math.floor((ms % day) / hour);
    minutes = Math.floor(((ms % day) % hour) / minute);
    seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

// funcion para agregar un 0 
function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}

document.addEventListener("DOMContentLoaded", function() {
    let datetimePicker = document.getElementById("datetime-picker");
    let botonStart = document.querySelector('[data-start]');
    let daysElement = document.querySelector('[data-days]');
    let hoursElement = document.querySelector('[data-hours]');
    let minutesElement = document.querySelector('[data-minutes]');
    let secondsElement = document.querySelector('[data-seconds]');

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let selectedDate = selectedDates[0];
        let currentDate = new Date();

        if (selectedDate <= currentDate) {
            Notiflix.Notify.failure("Please choose a date in the future");
            botonStart.disabled = true;
        } else {
            botonStart.disabled = false;
        }
    },
});

let countdownIntervalId;

function cuentaRegresiva() {
    let selectedDate = flatpickr.parseDate(datetimePicker.value);
    let currentDate = new Date();
    let countdown = selectedDate.getTime() - currentDate.getTime();

    if (countdown <= 0) {
        clearInterval(countdownIntervalId);
        Notiflix.Notify.success("CUENTA REGRESIVA TERMINADA!");
        return;
    }

    let { days, hours, minutes, seconds } = convertMs(countdown);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
}

    botonStart.addEventListener("click", function() {
        countdownIntervalId = setInterval(cuentaRegresiva, 1000);
        botonStart.disabled = true;
    });
});