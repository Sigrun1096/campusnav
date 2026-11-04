const pages = {
        1: document.getElementById("page1"),
        2: document.getElementById("page2"),
        3: document.getElementById("page3"),
        4: document.getElementById("page4"),
        5: document.getElementById("page5"),
        6: document.getElementById("page6"),
      };

      function show(n) {
        for (const k in pages) pages[k].classList.remove("active", "zoomout");
        pages[n].classList.add("active");
      }

      document.querySelectorAll("[data-goto]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          show(Number(button.dataset.goto));
        });
      });

      const floorLocations = {
        1: [
          "Registrar's Office",
          "Student Services",
          "Room 101 - Lecture Hall",
          "Room 102 - Classroom",
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
          "Room 401 - Classroom",
          "Room 402 - Classroom",
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
      };

      document.querySelectorAll(".floor-card[data-floor]").forEach((card) => {
        card.addEventListener("click", () => {
          const floor = card.dataset.floor;
          document.getElementById("floorDetailsTitle").textContent =
            `Floor ${floor} Rooms and Departments`;
          document.getElementById("floorDetailsIntro").textContent =
            `Explore the rooms and departments available on Floor ${floor}.`;
          document.getElementById("floorDetailsList").innerHTML =
            floorLocations[floor]
              .map((location) => `<li>${location}</li>`)
              .join("");
          show(5);
        });
      });

      document
        .getElementById("campusSearch")
        .addEventListener("submit", (event) => {
          event.preventDefault();
          const query = document.getElementById("searchQuery").value.trim();
          if (!query) {
            document.getElementById("searchQuery").focus();
            return;
          }

          const matches = Object.entries(floorLocations).flatMap(
            ([floor, locations]) =>
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
          document.getElementById("floorDetailsIntro").textContent =
            matches.length
              ? matches.length === 1
                ? `Located on Floor ${matches[0].floor}.`
                : `Found ${matches.length} matching campus locations.`
              : "No rooms or departments matched your search.";
          document.getElementById("floorDetailsList").innerHTML = matches.length
            ? matches
                .map(
                  ({ floor, location }) =>
                    `<li>${location} <span class="result-floor">Floor ${floor}</span></li>`,
                )
                .join("")
            : "<li>Try a room number, office, or department name.</li>";
          show(5);
        });

      const defaultAvatar =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Ccircle cx='48' cy='48' r='48' fill='%231b5138'/%3E%3Ccircle cx='48' cy='36' r='16' fill='%23eabf4a'/%3E%3Cpath d='M18 82c4-18 16-27 30-27s26 9 30 27' fill='%23eabf4a'/%3E%3C/svg%3E";
      const sessionKey = "campusnav.session";
      let currentProfile = null;

      function logout() {
        Object.keys(sessionStorage).forEach((key) => {
          if (key.startsWith("campusnav.")) {
            sessionStorage.removeItem(key);
          }
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

      function getSessionIdentity() {
        try {
          const session = JSON.parse(sessionStorage.getItem(sessionKey));
          return typeof session?.username === "string"
            ? session.username.trim()
            : "";
        } catch {
          return "";
        }
      }

      function profileStorageKey(identity) {
        return `campusnav.profile.${encodeURIComponent(identity)}`;
      }

      function loadProfile(identity) {
        try {
          return (
            JSON.parse(localStorage.getItem(profileStorageKey(identity))) || {
              fullName: "",
              username: identity,
              email: "",
              avatar: "",
            }
          );
        } catch {
          return null;
        }
      }

      function saveProfile(profile) {
        localStorage.setItem(
          profileStorageKey(profile.username),
          JSON.stringify(profile),
        );
      }

      function setProfileText(profile) {
        document.getElementById("profileDisplayName").textContent = profile
          ? profile.fullName || profile.username || "Profile available"
          : "No profile available";
        document.getElementById("profileStatus").textContent = profile
          ? "This profile is stored locally in this browser."
          : "Visitors can browse CampusNav without an account.";
        document.getElementById("profileFullName").textContent =
          profile?.fullName || "Not provided";
        document.getElementById("profileEmail").textContent =
          profile?.email || "Not provided";
        document.getElementById("profileUserId").textContent =
          profile?.username || "Not provided";
        document.getElementById("profileUsername").textContent =
          profile?.username || "Not provided";
        document.getElementById("profileRole").textContent = profile
          ? "Not provided"
          : "Not provided";
        document.getElementById("profileAvatar").src =
          profile?.avatar || defaultAvatar;
      }

      function populateProfileForm() {
        document.getElementById("fullNameInput").value =
          currentProfile.fullName || "";
        document.getElementById("usernameInput").value =
          currentProfile.username || "";
        document.getElementById("emailInput").value =
          currentProfile.email || "";
        document.getElementById("avatarInput").value = "";
      }

      function closeProfileForm() {
        document.getElementById("editProfileForm").classList.remove("is-open");
        document.getElementById("profileFormMessage").textContent = "";
      }

      const sessionIdentity = getSessionIdentity();
      currentProfile = sessionIdentity ? loadProfile(sessionIdentity) : null;
      setProfileText(currentProfile);
      document.getElementById("editProfileButton").disabled = !currentProfile;
      document.getElementById("editProfileButton").title = currentProfile
        ? "Edit local profile"
        : "Sign in or enter a username to create a local browser profile";

      document
        .getElementById("editProfileButton")
        .addEventListener("click", () => {
          if (!currentProfile) {
            return;
          }
          populateProfileForm();
          document.getElementById("editProfileForm").classList.add("is-open");
        });

      document
        .getElementById("cancelEditButton")
        .addEventListener("click", closeProfileForm);
      document
        .getElementById("changePasswordButton")
        .addEventListener("click", () => {
          const notice = document.getElementById("passwordNotice");
          notice.classList.remove("is-highlighted");
          void notice.offsetWidth;
          notice.classList.add("is-highlighted");
          window.setTimeout(
            () => notice.classList.remove("is-highlighted"),
            300,
          );
        });

      document
        .getElementById("avatarInput")
        .addEventListener("change", (event) => {
          const file = event.target.files[0];
          if (!file) return;
          if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            document.getElementById("profileFormMessage").textContent =
              "Choose a PNG, JPEG, or WebP image.";
            document.getElementById("profileFormMessage").className =
              "form-message error";
            event.target.value = "";
            return;
          }
          if (file.size > 2 * 1024 * 1024) {
            document.getElementById("profileFormMessage").textContent =
              "Profile picture must be smaller than 2 MB.";
            document.getElementById("profileFormMessage").className =
              "form-message error";
            event.target.value = "";
          }
        });

      document
        .getElementById("editProfileForm")
        .addEventListener("submit", (event) => {
          event.preventDefault();
          const fullName = document
            .getElementById("fullNameInput")
            .value.trim();
          const username = document
            .getElementById("usernameInput")
            .value.trim();
          const email = document.getElementById("emailInput").value.trim();
          const message = document.getElementById("profileFormMessage");

          if (!fullName || !username) {
            message.textContent = "Full name and username are required.";
            message.className = "form-message error";
            return;
          }
          if (!/^[A-Za-z0-9_.-]+$/.test(username)) {
            message.textContent =
              "Username may contain only letters, numbers, dots, underscores, and hyphens.";
            message.className = "form-message error";
            return;
          }
          if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            message.textContent = "Enter a valid email address.";
            message.className = "form-message error";
            return;
          }

          const completeSave = () => {
            const oldIdentity = sessionIdentity;
            const updated = { ...currentProfile, fullName, username, email };
            if (username !== oldIdentity) {
              localStorage.removeItem(profileStorageKey(oldIdentity));
            }
            saveProfile(updated);
            sessionStorage.setItem(sessionKey, JSON.stringify({ username }));
            currentProfile = updated;
            setProfileText(currentProfile);
            message.textContent = "Profile changes saved.";
            message.className = "form-message success";
            window.setTimeout(closeProfileForm, 700);
          };

          const avatarFile = document.getElementById("avatarInput").files[0];
          if (avatarFile) {
            const reader = new FileReader();
            reader.onload = () => {
              currentProfile.avatar = reader.result;
              completeSave();
            };
            reader.onerror = () => {
              message.textContent =
                "The profile picture could not be read. Please try another file.";
              message.className = "form-message error";
            };
            reader.readAsDataURL(avatarFile);
          } else {
            completeSave();
          }
        });

      // Back buttons
      document.querySelectorAll(".back").forEach((btn) => {
        btn.addEventListener("click", () => show(Number(btn.dataset.goto)));
      });

      // Esc key also goes back
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") show(1);
      });
