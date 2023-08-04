const loginFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#email-login');
  const passwordEl = document.querySelector('#password-login');

  //console.log({ usernameEl, passwordEl });

  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  //debugger;

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to login');
  }
};

document
  .querySelector('#login-btn')
  .addEventListener('click', loginFormHandler);
