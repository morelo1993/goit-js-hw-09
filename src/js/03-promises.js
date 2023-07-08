function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        let shouldResolve = Math.random() > 0.3;

        setTimeout(() => {
            let promiseData = { position, delay };

            if (shouldResolve) {
                resolve(promiseData);
            } else {
                reject(promiseData);
            }
        }, delay);
    });
}

document.getElementById("promise-form").addEventListener("submit", function (event) {
event.preventDefault();


let delayInput = document.getElementsByName("delay")[0];
let stepInput = document.getElementsByName("step")[0];
let amountInput = document.getElementsByName("amount")[0];

let delay = parseInt(delayInput.value);
let step = parseInt(stepInput.value);
let amount = parseInt(amountInput.value);

if (isNaN(delay) || isNaN(step) || isNaN(amount)) {
    Notiflix.Notify.failure("PORFAVOR INGRESA UN NUMERO VALIDO!");
    return;
}

let currentDelay = delay;

for (let i = 1; i <= amount; i++) {
    createPromise(i, currentDelay)
    .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

    currentDelay += step;
}
});