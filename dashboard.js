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
    "Room 101 - Classroom",
    "Room 105 - Classroom",
    "Room 106 - Classroom",
    "Room 107 - Classroom",
    "Room 108 - Classroom",
    "Room 109 - Classroom",
    "Room 110 - Classroom",
    "Room 111 - Classroom",
    "Room 112 - Classroom",
    "Room 116 - Classroom",
    "Room 117 - Classroom",
    "Room 118 - Classroom",
    "Room 119 - Classroom",
  ],
  2: [
    "Information Technology",
    "Room 201 - Computer Lab",
    "Room 202 - Classroom",
    "Room 203 - Classroom",
  ],
  3: [
    "College of Education",
    "Faculty Offices",
    "Room 301 - Classroom",
    "Room 302 - Lecture Hall",
  ],
  4: [
    "College of Business",
    "Conference Room",
    "Library",
    "4th floor comfort room",
    "Room 401 - Classroom",
    "Room 402 - Classroom",
    "Room 403 - Classroom",
    "Room 404 - Classroom",
    "Room 405 - Classroom",
    "Room 406 - Classroom",
    "Room 407 - Classroom",
    "Room 408 - Classroom",
    "Room 409 - Classroom",
    "Room 410 - Classroom",
    "Room 411 - Classroom",
    "Room 412 - Classroom",
    "Room 413 - Classroom",
    "Room 414 - Classroom",
    "Room 415 - Classroom",
    "Room 416 - Classroom",
    "Room 417 - Classroom",
    "Room 418 - Classroom",
    "Room 419 - Classroom",
  ],
  5: [
    "College of Arts and Sciences",
    "Science Laboratory",
    "Room 501 - Classroom",
    "Room 502 - Laboratory",
  ],
  6: [
    "Library Department",
    "Research Room",
    "Room 601 - Conference Room",
    "Room 602 - Faculty Lounge",
  ],
<<<<<<< HEAD
  5: ["College of Arts and Sciences", "Science Laboratory", "Room 501 - Classroom", "Room 502 - Laboratory"],
  6: [
    "Sixth floor comfort room",
    "Room 601 - Classroom",
    "Room 602 - Classroom",
    "Room 603 - Classroom",
    "Room 604 - Classroom",
    "Room 605 - Classroom",
    "Room 606 - Classroom",
    "Room 607 - Classroom",
    "Room 608 - Classroom",
    "Room 609 - Classroom",
    "Room 610 - Classroom",
    "Room 611 - Classroom",
    "Room 612 - Classroom",
    "Room 613 - Classroom",
    "Room 614 - Classroom",
    "Room 615 - Classroom",
    "Room 616 - Classroom",
    "Room 617 - Classroom",
    "Room 618 - Classroom",
    "Room 619 - Classroom",
    "Room 620 - Classroom",
    "Room 621 - Classroom",
    "Room 622 - Classroom",
    "Room 623 - Classroom",
    "Room 624 - Classroom",
    "Room 625 - Classroom",
    "Room 626 - Classroom",
    "Room 627 - Classroom",
    "Room 628 - Classroom"
  ]
=======
>>>>>>> ab203b80656a655085a6dfd471f37266ee1524bf
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
