// Function to convert milliseconds into days, hours, minutes, and seconds
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

let getRef = selector => document.querySelector(selector);
const inputDatePickerRef = getRef('#datetime-picker');
const btnStartRef = getRef('[data-start]');
const daysRef = getRef('[data-days]');
const hoursRef = getRef('[data-hours]');
const minutesRef = getRef('[data-minutes]');
const secondsRef = getRef('[data-seconds]');

let timeDifference = 0;
let timerId = null;
let formatDate = null;



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDifferenceDate(selectedDates[0]);
  },
};

btnStartRef.setAttribute('disabled', true);

btnStartRef.addEventListener('click', () => {
  timerId = setInterval(startTimer, 1000);
  btnStartRef.setAttribute('disabled', true);
  inputDatePickerRef.setAttribute('disabled', true);
});

function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    btnStartRef.setAttribute('disabled', true);
    return Notiflix.Notify.failure('Please choose a date in the future');
  }

  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  renderDate(formatDate);
  btnStartRef.removeAttribute('disabled');
}

function startTimer() {
  timeDifference -= 1000;

  if (timeDifference <= 0) {
    clearInterval(timerId);
    Notiflix.Notify.success('Time end');
  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}

function renderDate(formatDate) {
  secondsRef.textContent = addLeadingZero(formatDate.seconds);
  minutesRef.textContent = addLeadingZero(formatDate.minutes);
  hoursRef.textContent = addLeadingZero(formatDate.hours);
  daysRef.textContent = addLeadingZero(formatDate.days);
}

function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}
