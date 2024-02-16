// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import iconClose from '../img/bi_x-octagon.png';
// import iconOk from '../img/bi_check2-circle.svg';

// const form = document.querySelector('.form');
// const submitBtn = document.querySelector('[type="submit"]');

// form.addEventListener('submit', function (event) {
//   event.preventDefault();

//   const delay = Number(document.querySelector('[name="delay"]').value);
//   const state = document.querySelector('[name="state"]:checked');

//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (state.value === 'fulfilled') {
//         resolve(delay);
//       } else {
//         reject(delay);
//       }
//     }, delay);
//   });

//   promise
//     .then(delay => {
//       iziToast.success({
//         message: `Fulfilled promise in ${delay}ms`,
//         messageColor: '#FFF',
//         backgroundColor: '#59A10D',
//         position: 'topRight',
//         iconUrl: iconOk,
//       });
//     })
//     .catch(delay => {
//       iziToast.error({
//         message: `Rejected promise in ${delay}ms`,
//         messageColor: '#FFF',
//         backgroundColor: '#EF4040',
//         position: 'topRight',
//         iconUrl: iconClose,
//       });
//     });
// });
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const inputDelay = document.querySelector('[name="delay"]');


form.addEventListener("submit", onCreatePromise);

function onCreatePromise(e) {
  e.preventDefault();
    const delay = Number(inputDelay.value);
    const inputState = document.querySelector('[name="state"]:checked');
   
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (inputState.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
        }, delay);
    });
    
    myPromise.then(delay => {
        iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: '#FFFFFF',
        backgroundColor: '#59a10d',
        position: 'topRight',
        });
        
    }).catch(delay => {
          iziToast.show({
        message:`❌ Rejected promise in ${delay}ms`,
        messageColor: '#FFFFFF',
        backgroundColor: '#ef4040',
        position: 'topRight',
        });
    });
 
}