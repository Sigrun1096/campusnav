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

const roomImageViewer = document.createElement("div");
roomImageViewer.className = "room-image-viewer";
roomImageViewer.hidden = true;
roomImageViewer.innerHTML = `
  <button class="room-image-back" type="button">&larr; Back to rooms</button>
  <div class="room-image-content">
    <h2 class="room-image-title"></h2>
    <img class="room-image" alt="">
  </div>
`;
document.body.appendChild(roomImageViewer);

const roomImage = roomImageViewer.querySelector(".room-image");
const roomImageTitle = roomImageViewer.querySelector(".room-image-title");

const closeRoomImage = () => {
  roomImageViewer.hidden = true;
  roomImage.removeAttribute("src");
};

roomImageViewer
  .querySelector(".room-image-back")
  .addEventListener("click", closeRoomImage);

document.querySelectorAll(".room-list a[href$='.jpg']").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    roomImage.src = link.getAttribute("href");
    roomImage.alt = link.textContent.trim();
    roomImageTitle.textContent = link.textContent.trim();
    roomImageViewer.hidden = false;
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !roomImageViewer.hidden) {
    closeRoomImage();
  }
});

const locationImage = document.getElementById("searchLocationImage");
const searchForm = document.getElementById("campusSearch");

if (locationImage && searchForm) {
  const FLOOR1_SEARCH = {
    101: "101",
    105: "105",
    106: "106",
    107: "107",
    108: "108",
    109: "109",
    110: "110",
    111: "111",
    112: "112",
    116: "116",
    118: "118",
    119: "119",
    registrar: "registrar-office",
    finance: "finance",
    supply: "supply-shop",
    discipline: "discipline-office",
    canteen: "canteen",
    clinic: "clinic",
    lab: "lab",
    chtm: "chtm-training-room",
    "training room": "chtm-training-room",
    "comfort room": "comfort-left",
    stairs: "stairs-entrance",
  };
}
