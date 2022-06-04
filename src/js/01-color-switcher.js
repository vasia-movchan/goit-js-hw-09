const refs = {
  body: document.querySelector('body'),
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};

let timerId = null;
refs.stopButton.setAttribute('disabled', true);

refs.startButton.addEventListener('click', () => {
  refs.startButton.setAttribute('disabled', true);
  refs.stopButton.removeAttribute('disabled');
  timerId = setInterval(changeBgColor, 1000);
});

refs.stopButton.addEventListener('click', () => {
  refs.startButton.removeAttribute('disabled');
  refs.stopButton.setAttribute('disabled', true);
  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}
