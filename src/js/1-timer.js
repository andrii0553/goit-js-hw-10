import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  onClose(selectedDates) {
    userDate = selectedDates[0]; 
    if (userDate <= new Date()) {
      alert("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
}; 

const dataPicker = document.querySelector(`#datetime-picker`);
const startBtn = document.querySelector(`button[data-start]`);
const day = document.querySelector(`span[data-days]`);
const hour = document.querySelector(`span[data-hours]`);
const minute = document.querySelector(`span[data-minutes]`);
const second = document.querySelector(`span[data-seconds]`);


flatpickr(dataPicker, options);

let intervalId = null;
let userDate = null;


startBtn.addEventListener(`click`, () => {

    intervalId = setInterval(() => {
      const currentTime = new Date();
      const diffMs = userDate - currentTime;


        if (diffMs < 1000) {
          clearInterval(intervalId);
          return;
      }
      startBtn.disabled = true;
      const time = convertMs(diffMs);
      updateTimerDisplay(time);

    }, 1000);

});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
      day.textContent = String(days).padStart(2, '0');
      hour.textContent = String(hours).padStart(2, '0');
      minute.textContent = String(minutes).padStart(2, '0');
      second.textContent = String(seconds).padStart(2, '0');
    }