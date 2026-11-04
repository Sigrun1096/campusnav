(function () {
  const locationImage = document.getElementById("searchLocationImage");
  const searchForm = document.getElementById("campusSearch");

  if (!locationImage || !searchForm) {
    return;
  }

  const floor5Rooms = new Map(
    Array.from({ length: 26 }, (_, index) => [
      String(501 + index),
      `${index + 1}.jpg`,
    ]),
  );

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.getElementById("searchQuery").value.trim();
    const roomNumber = query.match(/\b5\d{2}\b/)?.[0];

    if (!roomNumber || !floor5Rooms.has(roomNumber)) {
      return;
    }

    locationImage.hidden = false;
    locationImage.src = `floors/5th/${floor5Rooms.get(roomNumber)}`;
    locationImage.alt = `Room ${roomNumber} location map`;
  });

  document.getElementById("searchBack").addEventListener("click", () => {
    locationImage.hidden = true;
  });
})();
