const locationImage = document.getElementById("searchLocationImage");
const searchForm = document.getElementById("campusSearch");

if (locationImage && searchForm) {
  const FLOOR1 = new Map([
    ["101", "101.png"],
    ["105", "105.png"],
    ["106", "106.png"],
    ["107", "107.png"],
    ["108", "108.png"],
    ["109", "109.png"],
    ["110", "110.png"],
    ["111", "111.png"],
    ["112", "112.png"],
    ["116", "116.png"],
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
      aliases: ["comfort room", "restroom", "cr"],
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

  const findFloor4Place = (query) => {
    const normalizedQuery = normalize(query);

    for (const place of floor4Places) {
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

  searchForm.addEventListener("submit", () => {
    const query = document.getElementById("searchQuery").value.trim();
    const roomNumber = query.match(/\b4\d{2}\b/)?.[0];
    const place = findFloor4Place(query);
    const imageName = roomNumber ? floor1Rooms.get(roomNumber) : place?.image;

    locationImage.hidden = !imageName;

    if (imageName) {
      const roomName = roomNumber ? `Room ${roomNumber}` : place.label;
      locationImage.src = `floors/1st  floor/${imageName}`;
      locationImage.alt = `${roomName} location map`;
    } else {
      locationImage.removeAttribute("src");
      locationImage.alt = "";
    }
  });

  document.getElementById("searchBack").addEventListener("click", () => {
    locationImage.hidden = true;
  });
}

const locationImage = document.getElementById("searchLocationImage");
const searchForm = document.getElementById("campusSearch");

if (locationImage && searchForm) {
  const floor4Rooms = new Map([
    ["401", "5.jpg"],
    ["402", "6.jpg"],
    ["403", "7.jpg"],
    ["404", "8.jpg"],
    ["405", "9.jpg"],
    ["406", "10.jpg"],
    ["407", "11.jpg"],
    ["408", "12.jpg"],
    ["409", "13.jpg"],
    ["410", "14.jpg"],
    ["411", "20.jpg"],
    ["412", "21.jpg"],
    ["413", "22.jpg"],
    ["414", "23.jpg"],
    ["415", "15.jpg"],
    ["416", "16.jpg"],
    ["417", "17.jpg"],
    ["418", "18.jpg"],
    ["419", "19.jpg"],
  ]);

  const floor4Places = [
    {
      aliases: [
        "4th floor comfort room",
        "comfort room",
        "comfort rooms",
        "restroom",
        "toilet",
      ],
      image: "3.jpg",
      label: "Fourth floor comfort room",
    },
    {
      aliases: ["library", "library department"],
      image: "24.jpg",
      label: "Library",
    },
    {
      aliases: ["college of business", "business department"],
      image: "12.jpg",
      label: "College of Business",
    },
    {
      aliases: ["conference room"],
      image: "13.jpg",
      label: "Conference room",
    },
  ];

  const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const findFloor4Place = (query) => {
    const normalizedQuery = normalize(query);

    for (const place of floor4Places) {
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

  searchForm.addEventListener("submit", () => {
    const query = document.getElementById("searchQuery").value.trim();
    const roomNumber = query.match(/\b4\d{2}\b/)?.[0];
    const place = findFloor4Place(query);
    const imageName = roomNumber ? floor4Rooms.get(roomNumber) : place?.image;

    locationImage.hidden = !imageName;

    if (imageName) {
      const roomName = roomNumber ? `Room ${roomNumber}` : place.label;
      locationImage.src = `floors/4th  floor/${imageName}`;
      locationImage.alt = `${roomName} location map`;
    } else {
      locationImage.removeAttribute("src");
      locationImage.alt = "";
    }
  });

  document.getElementById("searchBack").addEventListener("click", () => {
    locationImage.hidden = true;
  });
}
