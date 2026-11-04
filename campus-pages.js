function logout() {
  Object.keys(sessionStorage).forEach((key) => {
    if (key.startsWith("campusnav.")) sessionStorage.removeItem(key);
  });
  sessionStorage.setItem("campusnav.loggedOut", "true");
  const inFloors = window.location.pathname
    .replace(/\\/g, "/")
    .includes("/floors/");
  const loginPath = inFloors ? "../index.html" : "index.html";
  history.replaceState({ campusNav: "loggedOut" }, "", loginPath);
  window.location.replace(loginPath);
}

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) logoutButton.addEventListener("click", logout);

window.addEventListener("pageshow", (event) => {
  if (
    event.persisted &&
    sessionStorage.getItem("campusnav.loggedOut") === "true"
  ) {
    const inFloors = window.location.pathname
      .replace(/\\/g, "/")
      .includes("/floors/");
    window.location.replace(inFloors ? "../index.html" : "index.html");
  }
});
