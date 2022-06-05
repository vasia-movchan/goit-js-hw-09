const refs = {
  form: document.querySelector(".form"),
  firstDelay: document.querySelector(".form").elements.delay,
  stepDelay: document.querySelector(".form").elements.step,
  amount: document.querySelector(".form").elements.amount,
  submitBtn: document.querySelector("button"),
};

refs.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  createPromises();
}

function createPromises() {
  const amount = Number(refs.amount.value);
  const stepDelay = Number(refs.stepDelay.value);
  const firstDelay = Number(refs.firstDelay.value);
  let delay = firstDelay;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += stepDelay;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}
