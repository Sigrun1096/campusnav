(function () {
  const locationImage = document.getElementById("searchLocationImage");
  const searchForm = document.getElementById("campusSearch");

  if (!locationImage || !searchForm) {
    return;
  }

  const floor3Rooms = new Map([
    ["301", "15.jpg"],
    ["302", "16.jpg"],
    ["303", "17.jpg"],
    ["304", "18.jpg"],
    ["305", "19.jpg"],
    ["306", "20.jpg"],
    ["307", "21.jpg"],
    ["308", "22.jpg"],
    ["309", "23.jpg"],
    ["310", "24.jpg"],
    ["311", "25.jpg"],
    ["312", "26.jpg"],
    ["313", "27.jpg"],
    ["314", "28.jpg"],
    ["315", "2.jpg"],
    ["316", "3.jpg"],
    ["317", "4.jpg"],
    ["318", "5.jpg"],
    ["319", "6.jpg"],
    ["320", "7.jpg"],
    ["321", "8.jpg"],
    ["322", "9.jpg"],
    ["323", "10.jpg"],
    ["324", "11.jpg"],
    ["325", "12.jpg"],
    ["326", "13.jpg"],
  ]);

  const floor3Places = [
    {
      aliases: ["3rd floor comfort room", "third floor comfort room"],
      image: "1.jpg",
      label: "Third floor comfort room",
    },
  ];

  const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const findFloor3Place = (query) => {
    const normalizedQuery = normalize(query);

    return floor3Places.find((place) =>
      place.aliases.some((alias) => normalizedQuery.includes(normalize(alias))),
    );
  };

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.getElementById("searchQuery").value.trim();
    const roomNumber = query.match(/\b\d{3}\b/)?.[0];

    if (roomNumber && /^3\d{2}$/.test(roomNumber)) {
      const imageName = floor3Rooms.get(roomNumber);
      if (!imageName) {
        return;
      }
      locationImage.hidden = false;
      locationImage.src = `floors/3rd/${imageName}`;
      locationImage.alt = `Room ${roomNumber} location map`;
      return;
    }

    if (roomNumber) {
      return;
    }

    const place = findFloor3Place(query);
    if (!place) {
      return;
    }

    locationImage.hidden = false;
    locationImage.src = `floors/3rd/${place.image}`;
    locationImage.alt = `${place.label} location map`;
  });

  document.getElementById("searchBack").addEventListener("click", () => {
    locationImage.hidden = true;
  });
})();
