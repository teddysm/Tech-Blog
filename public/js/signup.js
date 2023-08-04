const signupFormHandler = async function (event) {
  event.preventDefault();

  console.log('signupFormHandler');
  debugger;

  const userEl = document.querySelector('#username-signup');
  const passwordEl = document.querySelector('#password-signup');

  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      username: userEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to sign up');
  }
};

document
  .querySelector('#submit-btn')
  .addEventListener('click', signupFormHandler);
