// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.querySelector("header").classList.toggle("dark-mode");
  document.querySelector("#skillsCanvas").classList.toggle("dark-mode");
  document.querySelector("#map").classList.toggle("dark-mode");
  document.querySelector("footer").classList.toggle("dark-mode");

  // Update button text
  darkModeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});

// CANVAS: Draw skills as a bar chart
const canvas = document.getElementById("skillsCanvas");
const ctx = canvas.getContext("2d");

// Skill Data
const skills = [
  { name: "HTML", level: 60 }, // Skill: HTML with proficiency level of 60%
  { name: "CSS", level: 40 }, // Skill: CSS with proficiency level of 40%
  { name: "JS", level: 30 }, // Skill: JavaScript with proficiency level of 30%
  { name: "Python", level: 80 }, // Skill: Python with proficiency level of 80%
  { name: "Java", level: 90 }, // Skill: Java with proficiency level of 90%
];

// Draw the chart
const drawChart = () => {
  const padding = 40; // Space on both sides of the canvas
  const totalBars = skills.length;
  const chartHeight = canvas.height - 30;

  const barGap = 20; // Minimum gap between bars
  const barWidth =
    (canvas.width - padding * 2 - barGap * (totalBars - 1)) / totalBars; // Dynamically calculate bar width

  // Clear the canvas before redrawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  skills.forEach((skill, index) => {
    const x = padding + index * (barWidth + barGap);
    const y = chartHeight - (skill.level / 100) * chartHeight;

    // Draw bar
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(x, y, barWidth, chartHeight - y);

    // Add border to the bar
    ctx.strokeStyle = "#2e7d32";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, barWidth, chartHeight - y);

    // Draw skill name
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.font = "14px Arial";
    ctx.fillText(skill.name, x + barWidth / 2, canvas.height - 10);
  });
};

drawChart();

// LEAFLET MAP: Show study and project locations
const map = L.map("map").setView([51.1657, 10.4515], 6); // Startpoint: Germany

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Study and project locations
const locations = [
  {
    lat: 49.0138923,
    lon: 8.4193626,
    title: "Karlsruhe Institute for Technology (KIT)",
    description: "Bachelor of Science in Computer Science",
    performance: ["Linear Algebra",
       "DBMS", 
       "Networking", 
       "Automata Theory"],
  },
  {
    lat: 47.667,
    lon: 9.1703563,
    title: "HTWG Hochschule Konstanz",
    description: "Studienkolleg, Technical Course",
    performance: [
      "Grade: 1.8",
      "Improved German Skills",
      "Enhanced Programming Competencies",
    ],
  },
  {
    lat: 49.0276746,
    lon: 8.352429,
    title: "Simus Systems (Working Student)",
    description: "Java Developer, Software Development",
    performance: [
      "Features implemented",
      "Bug Fixed",
      "Simus Classmate Editor and Finder Enhancements",
    ],
  },
  {
    lat: 49.0112407,
    lon: 8.4186582,
    title: "Intuitive Robots Lab (Developer)",
    description: "Praxis Software Entwicklung",
    performance: [
      "Requirement Analysis",
      "Waterfallmodell",
      "Typescript and Python Programming",
      "Class Diagramme",
      "Debugging",
    ],
  },
  {
    lat: 29.0040702,
    lon: 77.699136,
    title: "St. Mary's Academy",
    description: "Klasse 12. Abitur",
    performance: ["Physics",
       "Chemistry",
       "Mathematics",
       "Computer Science"],
  },
];

// Add markers for each location
locations.forEach((loc) => {
  const marker = L.marker([loc.lat, loc.lon]).addTo(map);

  marker.bindPopup(`
        <b>${loc.title}</b><br>${loc.description}<br>
        <button onclick="showDetails(${locations.indexOf(
          loc
        )})">Click for Details</button>
    `);
});

// Function to dynamically show performance details
function showDetails(locationIndex) {
  const location = locations[locationIndex];
  const detailsContainer = document.getElementById("details"); // A dedicated section for displaying details

  // Clear existing content
  detailsContainer.innerHTML = "";

  // Add title
  const titleElement = document.createElement("h3");
  titleElement.textContent = `Details for ${location.title}`;
  detailsContainer.appendChild(titleElement);

  // Add performance details as a list
  const list = document.createElement("ul");
  location.performance.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.appendChild(listItem);
  });
  detailsContainer.appendChild(list);

  // Ensure the section is visible
  detailsContainer.style.display = "block";
}

// Ensure map size updates properly
setTimeout(() => {
  map.invalidateSize();
}, 100);

window.addEventListener("scroll", () => {
  const curtain = document.getElementById("curtain");
  if (window.scrollY > 20) {
    curtain.style.transform = "translateY(-100%)";
    document.querySelector("main").style.visibility = "visible";
  }
});

// Remove curtain after 5 seconds automatically
setTimeout(() => {
  document.getElementById("curtain").style.transform = "translateY(-100%)";
  document.querySelector("main").style.visibility = "visible";
}, 5000);

// Initialize QRCodeStyling instance
const qrCode = new QRCodeStyling({
  width: 200, // Adjust the size as needed
  height: 200,
  data: "https://curriculum-vitae-black.vercel.app/SarthakCV.pdf",
  image: "./naruto.jpg",
  dotsOptions: {
    color: "#17eb8c", // QR code color
    type: "dots",
  },
  backgroundOptions: {
    color: "#ffff00", // Background color
  },
});

// Render the QR code into the div
qrCode.append(document.getElementById("qr-code"));

// Create overlay element
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

// Add click event listeners to hobby items
document.querySelectorAll(".hobby-item").forEach((item) => {
  item.addEventListener("click", function () {
    const container = this.parentElement.querySelector(
      ".hobby-image-container"
    );
    container.style.display = "block";
    overlay.style.display = "block";
  });
});

// Add click event listeners to close buttons
document.querySelectorAll(".close-image").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    const container = this.parentElement;
    container.style.display = "none";
    overlay.style.display = "none";
  });
});

// Close image when clicking overlay
overlay.addEventListener("click", function () {
  document.querySelectorAll(".hobby-image-container").forEach((container) => {
    container.style.display = "none";
  });
  overlay.style.display = "none";
});

// Close image when pressing Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll(".hobby-image-container").forEach((container) => {
      container.style.display = "none";
    });
    overlay.style.display = "none";
  }
});

// Contact form submission
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const senderEmail = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const emailRecipient = "udgvq@student.kit.edu";
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`
    );

    const mailtoLink = `mailto:${emailRecipient}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink; // Opens the default email client
  });
