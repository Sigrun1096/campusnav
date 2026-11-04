const floorLocations = {
  1: ["Registrar's Office", "Student Services", "Room 101 - Lecture Hall", "Room 102 - Classroom"],
  2: ["Information Technology", "Room 201 - Computer Lab", "Room 202 - Classroom", "Room 203 - Classroom"],
  3: ["College of Education", "Faculty Offices", "Room 301 - Classroom", "Room 302 - Lecture Hall"],
  4: ["College of Business", "Conference Room", "Room 401 - Classroom", "Room 402 - Classroom"],
  5: ["College of Arts and Sciences", "Science Laboratory", "Room 501 - Classroom", "Room 502 - Laboratory"],
  6: ["Library Department", "Research Room", "Room 601 - Conference Room", "Room 602 - Faculty Lounge"]
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
    locations.filter((location) => location.toLowerCase().includes(query.toLowerCase()))
      .map((location) => ({ floor, location }))
  );

  document.getElementById("floorDetailsTitle").textContent =
    matches.length === 1 ? matches[0].location : `Search results for "${query}"`;
  document.getElementById("floorDetailsIntro").textContent =
    matches.length
      ? matches.length === 1 ? `Located on Floor ${matches[0].floor}.`
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
  if (event.persisted && sessionStorage.getItem("campusnav.loggedOut") === "true") {
    window.location.replace("index.html");
  }
});
