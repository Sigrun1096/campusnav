(function () {
const fourthFloorLocationImage = document.getElementById("searchLocationImage");
const fourthFloorSearchForm = document.getElementById("campusSearch");

if (fourthFloorLocationImage && fourthFloorSearchForm) {
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
    ["419", "19.jpg"]
  ]);

  const floor4Places = [
    {
      aliases: ["4th floor comfort room", "comfort room", "comfort rooms", "restroom", "toilet"],
      image: "3.jpg",
      label: "Fourth floor comfort room"
    },
    {
      aliases: ["library", "library department"],
      image: "24.jpg",
      label: "Library"
    },
    
  ];

  const normalize = (value) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const findFloor4Place = (query) => {
    const normalizedQuery = normalize(query);

    for (const place of floor4Places) {
      if (
        place.aliases.some((alias) =>
          normalizedQuery.includes(normalize(alias))
        )
      ) {
        return place;
      }
    }

    return null;
  };

  fourthFloorSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("searchQuery").value.trim();
    const roomNumber = query.match(/\b4\d{2}\b/)?.[0];
    const place = findFloor4Place(query);
    if (!roomNumber && !place) {
      return;
    }
    const imageName = roomNumber ? floor4Rooms.get(roomNumber) : place?.image;

    fourthFloorLocationImage.hidden = !imageName;

    if (imageName) {
      const roomName = roomNumber ? `Room ${roomNumber}` : place.label;
      fourthFloorLocationImage.src = `floors/4th  floor/${imageName}`;
      fourthFloorLocationImage.alt = `${roomName} location map`;
    } else {
      fourthFloorLocationImage.removeAttribute("src");
      fourthFloorLocationImage.alt = "";
    }
  });

  document.getElementById("searchBack").addEventListener("click", () => {
    fourthFloorLocationImage.hidden = true;
  });
}
})();
