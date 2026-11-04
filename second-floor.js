(function () {
  const locationImage = document.getElementById("searchLocationImage");
  const searchForm = document.getElementById("campusSearch");

  if (!locationImage || !searchForm) {
    return;
  }

  const floor2Rooms = new Map([
    ["203", "17.jpg"],
    ["204", "18.jpg"],
    ["205", "21.jpg"],
    ["206", "21.jpg"],
    ["207", "22.jpg"],
    ["208", "23.jpg"],
    ["209", "24.jpg"],
    ["210", "25.jpg"],
    ["211", "26.jpg"],
    ["212", "27.jpg"],
    ["213", "28.jpg"],
    ["214", "29.jpg"],
    ["218", "5.jpg"],
    ["219", "6.jpg"],
    ["220", "7.jpg"],
    ["221", "8.jpg"],
    ["222", "9.jpg"],
    ["223", "10.jpg"],
    ["224", "11.jpg"],
    ["225", "12.jpg"],
    ["226", "13.jpg"],
  ]);

  const floor2Places = [
    {
      aliases: ["2nd floor comfort room", "second floor comfort room"],
      image: "1.jpg",
      label: "Second floor comfort room",
    },
    {
      aliases: ["supplies", "supply"],
      image: "16.jpg",
      label: "Supplies",
    },
    {
      aliases: ["2nd floor room 215", "room 215"],
      image: "2.jpg",
      label: "Room 215",
    },
    {
      aliases: ["2nd floor room 216", "room 216"],
      image: "3.jpg",
      label: "Room 216",
    },
    {
      aliases: ["2nd floor room 217", "room 217"],
      image: "4.jpg",
      label: "Room 217",
    },
  ];

  const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const findFloor2Place = (query) => {
    const normalizedQuery = normalize(query);

    return floor2Places.find((place) =>
      place.aliases.some((alias) => normalizedQuery.includes(normalize(alias))),
    );
  };

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.getElementById("searchQuery").value.trim();
    const roomNumber = query.match(/\b\d{3}\b/)?.[0];

    if (roomNumber && /^2\d{2}$/.test(roomNumber)) {
      const imageName =
        floor2Rooms.get(roomNumber) ||
        findFloor2Place(query)?.image;
      if (!imageName) {
        return;
      }
      locationImage.hidden = false;
      locationImage.src = `floors/2nd/${imageName}`;
      locationImage.alt = `Room ${roomNumber} location map`;
      return;
    }

    if (roomNumber) {
      return;
    }

    const place = findFloor2Place(query);
    if (!place) {
      return;
    }

    locationImage.hidden = false;
    locationImage.src = `floors/2nd/${place.image}`;
    locationImage.alt = `${place.label} location map`;
  });

  document.getElementById("searchBack").addEventListener("click", () => {
    locationImage.hidden = true;
  });
})();
