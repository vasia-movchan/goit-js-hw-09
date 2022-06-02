const refs = {
  body: document.querySelector('body'),
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};

refs.startButton.addEventListener('click', () => {
  refs.startButton.setAttribute('disabled', true);
});

refs.body.style.backgroundColor = getRandomHexColor();

refs.stopButton.addEventListener('click', () => {
  refs.startButton.removeAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
