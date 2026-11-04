const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");

passwordInput.addEventListener("input", () => {
  loginButton.classList.toggle("is-ready", passwordInput.value.length > 0);
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim();
  if (!username || !passwordInput.value) return;

  sessionStorage.setItem("campusnav.session", JSON.stringify({ username }));
  sessionStorage.removeItem("campusnav.loggedOut");
  passwordInput.value = "";
  window.location.href = "dashboard.html";
});
