(function () {
const sixthFloorLocationImage = document.getElementById("searchLocationImage");
const sixthFloorSearchForm = document.getElementById("campusSearch");

if (sixthFloorLocationImage && sixthFloorSearchForm) {
  const floor6Rooms = new Map([
    ["601", "2.jpg"],
    ["602", "3.jpg"],
    ["603", "4.jpg"],
    ["604", "5.jpg"],
    ["605", "6.jpg"],
    ["606", "7.jpg"],
    ["607", "8.jpg"],
    ["608", "9.jpg"],
    ["609", "10.jpg"],
    ["610", "11.jpg"],
    ["611", "12.jpg"],
    ["612", "13.jpg"],
    ["613", "14.jpg"],
    ["614", "15.jpg"],
    ["615", "17.jpg"],
    ["616", "16.jpg"],
    ["617", "18.jpg"],
    ["618", "19.jpg"],
    ["619", "21.jpg"],
    ["620", "20.jpg"],
    ["621", "21.jpg"],
    ["622", "22.jpg"],
    ["623", "23.jpg"],
    ["624", "24.jpg"],
    ["625", "25.jpg"],
    ["626", "26.jpg"],
    ["627", "27.jpg"],
    ["628", "28.jpg"],
  ]);

  const floor6Places = [
    {
      aliases: [
        "sixth floor comfort room",
        "6th floor comfort room",
      ],
      image: "1.jpg",
      label: "Sixth floor comfort room",
    },
  ];

  const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const findFloor6Place = (query) => {
    const normalizedQuery = normalize(query);

    for (const place of floor6Places) {
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

  sixthFloorSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("searchQuery").value.trim();
    const roomNumber = query.match(/\b6\d{2}\b/)?.[0];
    const place = findFloor6Place(query);
    const roomIsOnFloor6 = roomNumber && Number(roomNumber) >= 601 && Number(roomNumber) <= 628;
    const normalizedQuery = normalize(query);
    const isComfortRoom =
      normalizedQuery.includes("6thfloorcomfortroom") ||
      normalizedQuery.includes("sixthfloorcomfortroom");

    if (!roomIsOnFloor6 && !isComfortRoom && !place) {
      return;
    }

    if (isComfortRoom) {
      sixthFloorLocationImage.src = "floors/6th/1.jpg";
      sixthFloorLocationImage.alt = "Sixth floor comfort room location map";
      sixthFloorLocationImage.hidden = false;
      return;
    }

    const imageName = roomNumber ? floor6Rooms.get(roomNumber) : place?.image;

    sixthFloorLocationImage.hidden = !imageName;

    if (imageName) {
      const roomName = roomNumber ? `Room ${roomNumber}` : place.label;
      sixthFloorLocationImage.src = `floors/6th/${imageName}`;
      sixthFloorLocationImage.alt = `${roomName} location map`;
      sixthFloorLocationImage.hidden = false;
    } else {
      sixthFloorLocationImage.removeAttribute("src");
      sixthFloorLocationImage.alt = "";
    }
  });

  document.getElementById("searchBack").addEventListener("click", () => {
    sixthFloorLocationImage.hidden = true;
  });
}
})();
