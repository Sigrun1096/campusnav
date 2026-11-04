const defaultAvatar =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Ccircle cx='48' cy='48' r='48' fill='%231b5138'/%3E%3Ccircle cx='48' cy='36' r='16' fill='%23eabf4a'/%3E%3Cpath d='M18 82c4-18 16-27 30-27s26 9 30 27' fill='%23eabf4a'/%3E%3C/svg%3E";
const sessionKey = "campusnav.session";
let currentProfile = null;

function getSessionIdentity() {
  try {
    const session = JSON.parse(sessionStorage.getItem(sessionKey));
    return typeof session?.username === "string" ? session.username.trim() : "";
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
  document.getElementById("profileRole").textContent = "Not provided";
  document.getElementById("profileAvatar").src =
    profile?.avatar || defaultAvatar;
}
function populateProfileForm() {
  document.getElementById("fullNameInput").value =
    currentProfile.fullName || "";
  document.getElementById("usernameInput").value =
    currentProfile.username || "";
  document.getElementById("emailInput").value = currentProfile.email || "";
  document.getElementById("avatarInput").value = "";
}
function closeProfileForm() {
  document.getElementById("editProfileForm").classList.remove("is-open");
  document.getElementById("profileFormMessage").textContent = "";
}

const sessionIdentity = getSessionIdentity();
currentProfile = sessionIdentity ? loadProfile(sessionIdentity) : null;
setProfileText(currentProfile);
const editButton = document.getElementById("editProfileButton");
editButton.disabled = !currentProfile;
editButton.title = currentProfile
  ? "Edit local profile"
  : "Sign in or enter a username to create a local browser profile";
editButton.addEventListener("click", () => {
  if (!currentProfile) return;
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
    notice.classList.add("is-highlighted");
    window.setTimeout(() => notice.classList.remove("is-highlighted"), 300);
  });
document.getElementById("avatarInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  const message = document.getElementById("profileFormMessage");
  if (!file) return;
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    message.textContent = "Choose a PNG, JPEG, or WebP image.";
    message.className = "form-message error";
    event.target.value = "";
  } else if (file.size > 2 * 1024 * 1024) {
    message.textContent = "Profile picture must be smaller than 2 MB.";
    message.className = "form-message error";
    event.target.value = "";
  } else {
    message.textContent = "";
    message.className = "form-message";
  }
});
document
  .getElementById("editProfileForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const fullName = document.getElementById("fullNameInput").value.trim();
    const username = document.getElementById("usernameInput").value.trim();
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
    if (email && !/^[^\s@]+\@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.textContent = "Enter a valid email address.";
      message.className = "form-message error";
      return;
    }
    const completeSave = () => {
      const updated = { ...currentProfile, fullName, username, email };
      if (username !== sessionIdentity)
        localStorage.removeItem(profileStorageKey(sessionIdentity));
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
    } else completeSave();
  });
