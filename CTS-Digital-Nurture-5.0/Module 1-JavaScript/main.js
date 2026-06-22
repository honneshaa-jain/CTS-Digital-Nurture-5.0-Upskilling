// ============================================================
// Exercise 1: Setup - console log + alert on load
// ============================================================
console.log("Welcome to the Community Portal");

window.addEventListener("load", () => {
  alert("Welcome to the Community Event Portal! 🎉");
  loadPreference();
  fetchEvents(); // Exercise 9 & 12
});

// ============================================================
// Exercise 2: Data Types and Operators
// ============================================================
const portalName = "Local Community Event Portal"; // const for fixed
const portalDate = "2025";                          // const for fixed
let totalSeats = 100;                               // let for changing value

console.log(`Portal: ${portalName} | Year: ${portalDate} | Seats: ${totalSeats}`);

// ============================================================
// Exercise 5: Event Objects + Prototypes
// ============================================================
function Event(id, title, category, city, seats, fee) {
  this.id = id;
  this.title = title;
  this.category = category;
  this.city = city;
  this.seats = seats;
  this.fee = fee;
}

// checkAvailability added to prototype
Event.prototype.checkAvailability = function () {
  return this.seats > 0 ? `✅ ${this.seats} seats available` : "❌ Fully booked";
};

// ============================================================
// Exercise 6: Arrays
// ============================================================
let eventsArray = [
  new Event(1, "Music Festival 2025", "Music", "New York",  10, "₹500"),
  new Event(2, "Tech Talk Series",    "Tech",  "Chicago",   5,  "₹300"),
  new Event(3, "Community Food Fair", "Food",  "LA",        20, "Free"),
  new Event(4, "Community Art Show",  "Art",   "New York",  8,  "₹200"),
  new Event(5, "Yoga & Wellness Day", "Food",  "Chicago",   15, "Free"),
];

// Exercise 10: Spread to clone before filtering
let displayedEvents = [...eventsArray];

// Log object entries
console.log("Events:", Object.entries(eventsArray[0]));

// ============================================================
// Exercise 7: DOM Manipulation — render event cards
// ============================================================
function renderEvents(events) {
  const grid = document.querySelector("#eventCardsGrid");
  grid.innerHTML = "";

  // Exercise 3: filter out past/full using if-else + forEach
  events.forEach((ev) => {
    // Exercise 3: try-catch around card creation
    try {
      if (ev.seats < 0) throw new Error("Invalid seat count for " + ev.title);

      const card = document.createElement("div");
      card.className = "event-card";
      card.setAttribute("data-category", ev.category);

      // Exercise 6: map to format display
      card.innerHTML = `
        <div class="event-card-header">
          <h3>${ev.title}</h3>
          <small>${ev.city}</small>
        </div>
        <div class="event-card-body">
          <p>${ev.checkAvailability()}</p>
          <div class="event-meta">
            <span class="event-badge">${ev.category}</span>
            <span class="seats-badge">${ev.fee}</span>
          </div>
          <button class="register-btn" 
            id="regBtn-${ev.id}" 
            ${ev.seats === 0 ? "disabled" : ""}
            onclick="handleRegisterClick(${ev.id})">
            ${ev.seats === 0 ? "Fully Booked" : "Register →"}
          </button>
        </div>
      `;
      grid.appendChild(card);
    } catch (err) {
      console.error("Card error:", err.message);
    }
  });
}

// ============================================================
// Exercise 4: Closures — track registrations per category
// ============================================================
function makeRegistrationTracker() {
  const counts = {};
  return function (category) {
    counts[category] = (counts[category] || 0) + 1;
    console.log(`Category registrations:`, counts);
    return counts[category];
  };
}
const trackRegistration = makeRegistrationTracker();

// global count
let globalRegistrationCount = 0;

function updateRegistrationCount() {
  document.getElementById("totalRegistrations").innerText =
    `🎟️ Total Registrations: ${globalRegistrationCount}`;
}

// ============================================================
// Exercise 8: Event Handling — Register button click
// ============================================================
function handleRegisterClick(eventId) {
  const ev = eventsArray.find((e) => e.id === eventId);
  if (!ev || ev.seats === 0) return;

  ev.seats--;              // Exercise 2: -- operator
  totalSeats--;
  globalRegistrationCount++;

  trackRegistration(ev.category); // Exercise 4: closure
  updateRegistrationCount();
  renderEvents(displayedEvents);  // Exercise 7: update UI

  alert(`✅ Registered for "${ev.title}"! Seats left: ${ev.seats}`);
}

// ============================================================
// Exercise 8: keydown — search events
// ============================================================
document.querySelector("#searchBox").addEventListener("keydown", function (e) {
  const query = this.value.toLowerCase();
  const filtered = eventsArray.filter((ev) =>
    ev.title.toLowerCase().includes(query)
  );
  displayedEvents = filtered;
  renderEvents(displayedEvents);
});

// also filter on input for live search
document.querySelector("#searchBox").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  displayedEvents = eventsArray.filter((ev) =>
    ev.title.toLowerCase().includes(query)
  );
  renderEvents(displayedEvents);
});

// ============================================================
// Exercise 4 & 6: Filter by category using callback
// ============================================================
function filterEvents(category) {
  // update active button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.innerText.includes(category) || category === "All" && btn.innerText === "All");
  });

  // Exercise 6: filter array method with callback
  displayedEvents = category === "All"
    ? [...eventsArray]
    : eventsArray.filter((ev) => ev.category === category);

  renderEvents(displayedEvents);
}

// ============================================================
// Exercise 9 & 12: Async/Await + Fetch API
// ============================================================
async function fetchEvents() {
  const spinner = document.getElementById("loadingSpinner");
  spinner.style.display = "block";

  try {
    // Exercise 12: fetch to mock API
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=1");
    
    // Exercise 9: async/await
    const data = await response.json();
    console.log("Mock API response:", data);

    // Exercise 12: setTimeout to simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    spinner.style.display = "none";
    renderEvents(eventsArray); // render our local events after "fetch"
    updateRegistrationCount();

  } catch (err) {
    // Exercise 9: .catch equivalent
    spinner.style.display = "none";
    console.error("Fetch error:", err);
    renderEvents(eventsArray); // fallback
  }
}

// ============================================================
// Exercise 11: Form Handling
// ============================================================
document.getElementById("registerBtn").addEventListener("click", function () {
  const name  = document.getElementById("regName");
  const email = document.getElementById("regEmail");
  const event = document.getElementById("regEvent");
  let valid = true;

  // Exercise 11: validate + show errors inline
  document.querySelectorAll(".error-msg").forEach(e => e.style.display = "none");

  if (!name.value.trim()) {
    document.getElementById("nameError").style.display = "block";
    valid = false;
  }
  if (!email.value.includes("@")) {
    document.getElementById("emailError").style.display = "block";
    valid = false;
  }
  if (!event.value) {
    document.getElementById("eventError").style.display = "block";
    valid = false;
  }

  if (valid) {
    // Exercise 11: preventDefault equivalent (no form submit)
    const out = document.getElementById("confirmOutput");
    out.style.display = "block";
    out.innerText = `🎉 Thank you ${name.value}! Registered for ${event.value} event.`;
    
    // Exercise 12: simulate POST with fetch
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.value, email: email.value, event: event.value }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Registration POST response:", data))
      .catch((err) => console.error("POST error:", err));
  }
});

// ============================================================
// Exercise 8: onblur phone validation
// ============================================================
document.getElementById("phone").addEventListener("blur", function () {
  if (this.value && !/^\d{10}$/.test(this.value))
    alert("Please enter a valid 10-digit phone number.");
});

// Exercise 8: onchange fee display
document.getElementById("feedbackEventSelect").addEventListener("change", function () {
  const fees = { Music: "₹500", Tech: "₹300", Food: "Free" };
  const el = document.getElementById("feeDisplay");
  if (this.value) el.innerText = "💰 Event Fee: " + fees[this.value];
});

// Exercise 8: keyup char counter
document.getElementById("feedbackText").addEventListener("keyup", function () {
  document.getElementById("charCount").innerText =
    this.value.length + " characters typed";
});

// ============================================================
// Exercise 10: Destructuring + default params
// ============================================================
function addEvent({ title = "New Event", category = "General", seats = 50, fee = "Free" } = {}) {
  const newId = eventsArray.length + 1;
  const ev = new Event(newId, title, category, "TBD", seats, fee);
  eventsArray.push(ev); // Exercise 6: push
  renderEvents([...eventsArray]);
  console.log("New event added:", ev.title);
}

// Exercise 10: spread clone example in console
const clonedEvents = [...eventsArray];
console.log("Cloned events count:", clonedEvents.length);

// ============================================================
// Exercise 8: localStorage preferences
// ============================================================
document.getElementById("prefEvent").addEventListener("change", function () {
  localStorage.setItem("preferredEvent", this.value);
  document.getElementById("prefMsg").innerText = "✅ Preference saved: " + this.value;
});

function loadPreference() {
  const saved = localStorage.getItem("preferredEvent");
  if (saved) {
    document.getElementById("prefEvent").value = saved;
    document.getElementById("prefMsg").innerText = "👋 Welcome back! Preference: " + saved;
  }
}

document.getElementById("clearPrefBtn").addEventListener("click", function () {
  localStorage.clear();
  sessionStorage.clear();
  document.getElementById("prefMsg").innerText = "🗑️ Preferences cleared!";
  document.getElementById("prefEvent").value = "";
});

// ============================================================
// Exercise 7 & 8: Video media event
// ============================================================
document.getElementById("promoVideo").addEventListener("canplay", function () {
  document.getElementById("videoMsg").innerText = "✅ Video ready to play!";
});

// ============================================================
// Exercise 9: Geolocation with promise-style
// ============================================================
document.getElementById("locationBtn").addEventListener("click", function () {
  const result = document.getElementById("locationResult");
  result.style.display = "block";
  result.innerText = "🔍 Locating you...";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        result.innerText = `📍 Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`;
      },
      (err) => {
        result.innerText = err.code === 1 ? "❌ Location access denied." : "⚠️ Could not get location.";
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  } else {
    result.innerText = "⚠️ Geolocation not supported.";
  }
});

// ============================================================
// Exercise 14: jQuery
// ============================================================
$(document).ready(function () {
  // jQuery click handler for feedback submit
  $("#submitFeedbackBtn").click(function () {
    const text = $("#feedbackText").val();
    if (!text.trim()) {
      alert("Please write your feedback first!");
      return;
    }
    // fadeOut then fadeIn to show thank you
    $("#submitFeedbackBtn").fadeOut(300, function () {
      $(this).text("✅ Feedback Submitted!").fadeIn(300);
    });
  });

  // jQuery toggle event cards
  let cardsVisible = true;
  $("#toggleCardsBtn").click(function () {
    if (cardsVisible) {
      $("#eventCardsGrid").fadeOut(400);
      $(this).text("Show Events");
    } else {
      $("#eventCardsGrid").fadeIn(400);
      $(this).text("Hide Events");
    }
    cardsVisible = !cardsVisible;
  });
});

window.onbeforeunload = function () {
  if (document.getElementById("regName").value)
    return "You have unsaved form data. Leave anyway?";
};