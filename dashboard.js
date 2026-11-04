const floorLocations = {
  1: [
    "1st floor Comfort Room",
    "Supply Shop",
    "Finance",
    "Registrar Office",
    "Lab",
    "Clinic",
    "Discipline Office",
    "Canteen",
    "CHTM Training Room",
    "Room 101 - Room",
    "Room 105 - Room",
    "Room 106 - Room",
    "Room 107 - Room",
    "Room 108 - Room",
    "Room 109 - Room",
    "Room 110 - Room",
    "Room 111 - Room",
    "Room 112 - Room",
    "Room 116 - Room",
    "Room 117 - Room",
    "Room 118 - Room",
    "Room 119 - Room",
  ],
  2: [
    "Information Technology",
    "Room 201 - Computer Lab",
    "Room 202 - Room",
    "Room 203 - Room",
  ],
  3: [
    "College of Education",
    "Faculty Offices",
    "Room 301 - Room",
    "Room 302 - Lecture Hall",
  ],
  4: [
    "College of Business",
    "Conference Room",
    "Library",
    "4th floor comfort room",
    "Room 401 - Room",
    "Room 402 - Room",
    "Room 403 - Room",
    "Room 404 - Room",
    "Room 405 - Room",
    "Room 406 - Room",
    "Room 407 - Room",
    "Room 408 - Room",
    "Room 409 - Room",
    "Room 410 - Room",
    "Room 411 - Room",
    "Room 412 - Room",
    "Room 413 - Room",
    "Room 414 - Room",
    "Room 415 - Room",
    "Room 416 - Room",
    "Room 417 - Room",
    "Room 418 - Room",
    "Room 419 - Room",
  ],
  5: [
    "College of Arts and Sciences",
    "Science Laboratory",
    "Room 501 - Room",
    "Room 502 - Laboratory",
  ],
  6: [
    "Library Department",
    "Research Room",
    "Room 601 - Conference Room",
    "Room 602 - Faculty Lounge",
  ],
};

const page1 = document.getElementById("page1");
const page5 = document.getElementById("page5");

function showSearchResults() {
  page1.classList.remove("active");
  page5.classList.add("active");
}

document.getElementById("campusSearch").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.getElementById("searchQuery").value.trim();
  if (!query) {
    document.getElementById("searchQuery").focus();
    return;
  }

  const matches = Object.entries(floorLocations).flatMap(([floor, locations]) =>
    locations
      .filter((location) =>
        location.toLowerCase().includes(query.toLowerCase()),
      )
      .map((location) => ({ floor, location })),
  );

  document.getElementById("floorDetailsTitle").textContent =
    matches.length === 1
      ? matches[0].location
      : `Search results for "${query}"`;
  document.getElementById("floorDetailsIntro").textContent = matches.length
    ? matches.length === 1
      ? `Located on Floor ${matches[0].floor}.`
      : `Found ${matches.length} matching campus locations.`
    : "No rooms or departments matched your search.";

  const list = document.getElementById("floorDetailsList");
  list.replaceChildren();
  if (matches.length) {
    matches.forEach(({ floor, location }) => {
      const item = document.createElement("li");
      item.textContent = `${location} — Floor ${floor}`;
      list.appendChild(item);
    });
  } else {
    const item = document.createElement("li");
    item.textContent = "Try a room number, office, or department name.";
    list.appendChild(item);
  }
  showSearchResults();
});

document.getElementById("searchBack").addEventListener("click", () => {
  page5.classList.remove("active");
  page1.classList.add("active");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && page5.classList.contains("active")) {
    page5.classList.remove("active");
    page1.classList.add("active");
  }
});

function logout() {
  Object.keys(sessionStorage).forEach((key) => {
    if (key.startsWith("campusnav.")) sessionStorage.removeItem(key);
  });
  sessionStorage.setItem("campusnav.loggedOut", "true");
  history.replaceState({ campusNav: "loggedOut" }, "", "index.html");
  window.location.replace("index.html");
}

document.getElementById("logoutButton").addEventListener("click", logout);

window.addEventListener("pageshow", (event) => {
  if (
    event.persisted &&
    sessionStorage.getItem("campusnav.loggedOut") === "true"
  ) {
    window.location.replace("index.html");
  }
});
