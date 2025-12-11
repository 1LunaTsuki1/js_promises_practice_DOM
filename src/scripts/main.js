'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      leftClicked = true;
    }

    if (ev.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function showMessage(message, error = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  if (error) {
    div.classList.add('error');
  } else {
    div.classList.add('success');
  }
  div.textContent = message;
  body.append(div);
}

function handlerPromise(promise) {
  promise.then(
    (message) => showMessage(message),
    (message) => showMessage(message, true),
  );
}
handlerPromise(promise1);
handlerPromise(promise2);
handlerPromise(promise3);
