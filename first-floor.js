(function () {
  const locationImage = document.getElementById("searchLocationImage");
  const searchForm = document.getElementById("campusSearch");

  if (!locationImage || !searchForm) {
    return;
  }

  const floor1Rooms = new Map([
    ["101", "101.png"],
    ["102", "supply-shop.png"],
    ["103", "finance.png"],
    ["104", "reistrar-office.png"],
    ["105", "105.png"],
    ["106", "106.png"],
    ["107", "107.png"],
    ["108", "108.png"],
    ["109", "109.png"],
    ["110", "110.png"],
    ["111", "111.png"],
    ["112", "112.png"],
    ["113", "comfort-right.png"],
    ["114", "lab.png"],
    ["115", "clinic.png"],
    ["116", "116.png"],
    ["117", "discipline-office.png"],
    ["118", "118.png"],
    ["119", "119.png"],
  ]);

  const floor1Places = [
    {
      aliases: ["registrar", "registrar office"],
      image: "registrar-office.png",
      label: "Registrar Office",
    },
    {
      aliases: ["finance", "finance office"],
      image: "finance.png",
      label: "Finance Office",
    },
    {
      aliases: ["supply", "supply shop"],
      image: "supply-shop.png",
      label: "Supply Shop",
    },
    {
      aliases: ["discipline", "discipline office"],
      image: "discipline-office.png",
      label: "Discipline Office",
    },
    {
      aliases: ["canteen"],
      image: "canteen.png",
      label: "Canteen",
    },
    {
      aliases: ["clinic"],
      image: "clinic.png",
      label: "Clinic",
    },
    {
      aliases: ["lab", "laboratory"],
      image: "lab.png",
      label: "Laboratory",
    },
    {
      aliases: ["chtm", "training room", "chtm training room"],
      image: "chtm-training-room.png",
      label: "CHTM Training Room",
    },
    {
      aliases: [
        "1st floor comfort room",
        "first floor comfort room",
        "1st floor restroom",
        "first floor restroom",
      ],
      image: "comfort-left.png",
      label: "Comfort Room",
    },
    {
      aliases: ["stairs", "stairs entrance"],
      image: "stairs-entrance.png",
      label: "Stairs Entrance",
    },
  ];

  const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const findFloor1Place = (query) => {
    const normalizedQuery = normalize(query);

    for (const place of floor1Places) {
      if (
        place.aliases.some((alias) =>
          normalizedQuery.includes(normalize(alias)),
        )
      ) {
        return place;
      }
    }

    return null;
  };

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.getElementById("searchQuery").value.trim();
    const roomNumber = query.match(/\b\d{3}\b/)?.[0];

    if (!roomNumber || !/^1\d{2}$/.test(roomNumber)) {
      const place = findFloor1Place(query);
      if (!place) {
        return;
      }

      locationImage.hidden = false;
      locationImage.src = `floors/floor1-images/${place.image}`;
      locationImage.alt = `${place.label} location map`;
      return;
    }

    const imageName = floor1Rooms.get(roomNumber);
    locationImage.hidden = !imageName;

    if (imageName) {
      locationImage.src = `floors/floor1-images/${imageName}`;
      locationImage.alt = `Room ${roomNumber} location map`;
    } else {
      locationImage.removeAttribute("src");
      locationImage.alt = "";
    }
  });

  document.getElementById("searchBack").addEventListener("click", () => {
    locationImage.hidden = true;
  });
})();
