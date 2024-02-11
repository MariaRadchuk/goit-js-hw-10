import iziToast from "izitoast";

document.querySelector('.form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const delayInput = this.querySelector('[name="delay"]');
  const stateInput = this.querySelector('[name="state"]:checked');

  const delay = parseInt(delayInput.value);

  if (isNaN(delay) || delay <= 0) {
    iziToast.error({
      title: 'Error',
      message: 'Delay must be a positive number',
      position: 'topRight'
    });
    return;
  }

  const state = stateInput.value;

  try {
    await new Promise((resolve, reject) => {
      if (state === 'fulfilled') {
        setTimeout(() => resolve(delay), delay);
      } else {
        setTimeout(() => reject(delay), delay);
      }
    });

    iziToast.success({
      title: 'Success',
      message: `✅ Fulfilled promise in ${delay}ms`,
      position: 'topRight'
    });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `❌ Rejected promise in ${delay}ms`,
      position: 'topRight'
    });
  }
});
