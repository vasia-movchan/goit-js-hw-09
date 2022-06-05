import flatpickr from "flatpickr";
import Notiflix from "notiflix";

// import "flatpickr/dist/flatpickr.css";
// через import css стилі не підключаються
// працює тільки якщо в HTML підключити стилі через cdn

const refs = {
  input: document.querySelector("#datetime-picker"),
  button: document.querySelector("[data-start]"),
  seconds: document.querySelector("[data-seconds]"),
  minutes: document.querySelector("[data-minutes]"),
  hours: document.querySelector("[data-hours]"),
  days: document.querySelector("[data-days]"),
};

refs.button.disabled = true;
let currentDate = new Date();
let selectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDate = new Date();
    if (selectedDates[0] > currentDate) {
      refs.button.disabled = false;
      selectedDate = selectedDates[0];
    } else {
      refs.button.disabled = true;
      Notiflix.Notify.failure("Please choose a date in the future");
    }
  },
};

flatpickr(refs.input, options);

refs.button.addEventListener("click", () => {
  intervalId = setInterval(startTimer, 1000);
});

function startTimer() {
  currentDate = new Date();
  const timeToStopTimer = selectedDate - currentDate;
  if (timeToStopTimer < 0) {
    refs.button.disabled = true;
    return clearInterval(intervalId);
  }
  const convertDate = convertMs(timeToStopTimer);

  renderTimer(convertDate);
}

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

function renderTimer({ days, hours, minutes, seconds }) {
  refs.seconds.textContent = addLeadingZero(seconds);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.hours.textContent = addLeadingZero(hours);
  refs.days.textContent = addLeadingZero(days);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}
