(function () {
  const locationImage = document.getElementById("searchLocationImage");
  const searchForm = document.getElementById("campusSearch");

  if (!locationImage || !searchForm) {
    return;
  }

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
        "4th floor comfort rooms",
        "4th floor restroom",
        "fourth floor comfort room",
        "fourth floor comfort rooms",
        "fourth floor restroom",
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

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.getElementById("searchQuery").value.trim();
    const roomNumber = query.match(/\b\d{3}\b/)?.[0];

    if (roomNumber && /^4\d{2}$/.test(roomNumber)) {
      const imageName = floor4Rooms.get(roomNumber);
      if (!imageName) {
        return;
      }
      locationImage.hidden = false;
      locationImage.src = `floors/4th  floor/${imageName}`;
      locationImage.alt = `Room ${roomNumber} location map`;
      return;
    }

    if (roomNumber) {
      return;
    }

    const place = findFloor4Place(query);
    if (!place) {
      return;
    }

    const imageName = place.image;
    locationImage.hidden = !imageName;

    if (imageName) {
      locationImage.src = `floors/4th  floor/${imageName}`;
      locationImage.alt = `${place.label} location map`;
    } else {
      locationImage.removeAttribute("src");
      locationImage.alt = "";
    }
  });

  document.getElementById("searchBack").addEventListener("click", () => {
    locationImage.hidden = true;
  });
})();
