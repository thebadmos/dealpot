const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});


document.getElementById("login").addEventListener("click", function () {
  document.getElementById("eml").value = "";
  document.getElementById("paswd").value = "";
});
document.getElementById("createaccount").addEventListener("click", function () {
  document.getElementById("fn").value = "";
  document.getElementById("ln").value = "";
  document.getElementById("nb").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
});

