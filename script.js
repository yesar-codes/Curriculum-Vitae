// DEVICE ORIENTATION: Moves the header text
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', event => {
        const header = document.querySelector('header h1');
        const x = event.gamma; // Left to right
        const y = event.beta; // Front to back

        // Apply transformation
        header.style.transform = `rotateX(${y / 10}deg) rotateY(${x / 10}deg)`;
    });
}

// CANVAS: Draw skills as a bar chart
const canvas = document.getElementById('skillsCanvas');
const ctx = canvas.getContext('2d');

// Skill Data
const skills = [
    { name: 'HTML', level: 60 },
    { name: 'CSS', level: 40 },
    { name: 'JS', level: 30 },
    { name: 'Python', level: 80 },
    { name: 'Java', level: 90 }
];

// Draw the chart
const drawChart = () => {
    const padding = 40; // Space on both sides of the canvas
    const totalBars = skills.length;
    const chartHeight = canvas.height - 30;

    const barGap = 20; // Minimum gap between bars
    const barWidth = (canvas.width - padding * 2 - barGap * (totalBars - 1)) / totalBars; // Dynamically calculate bar width

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    skills.forEach((skill, index) => {
        const x = padding + index * (barWidth + barGap);
        const y = chartHeight - (skill.level / 100) * chartHeight;

        // Draw bar
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(x, y, barWidth, chartHeight - y);

        // Add border to the bar
        ctx.strokeStyle = '#2e7d32';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, chartHeight - y);

        // Draw skill name
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.font = '14px Arial';
        ctx.fillText(skill.name, x + barWidth / 2, canvas.height - 10);
    });
};

drawChart();


// LEAFLET MAP: Show study and project locations
const map = L.map('map').setView([51.1657, 10.4515], 6); // Startpoint: Germany

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Study and project locations
const locations = [
    {
        lat: 49.0138923,
        lon: 8.4193626,
        title: 'Karlsruhe Institute for Technology (KIT)',
        description: 'Bachelor of Science in Computer Science',
        performance: ['Linear Algebra', 'DBMS', 'Networking', 'Automata Theory']
    },
    {
        lat: 47.6670000,
        lon: 9.1703563,
        title: 'HTWG Hochschule Konstanz',
        description: 'Studienkolleg, Technical Course',
        performance: ['Grade: 1.8', 'Improved German Skills', 'Enhanced Programming Competencies']
    },
    {
        lat: 49.0276746,
        lon: 8.3524290,
        title: 'Simus Systems (Working Student)',
        description: 'Java Developer, Software Development',
        performance: ['Features Added', 'Bug Fixing', 'Simus Classmate Enhancements']
    },
    {
        lat: 49.0112407,
        lon: 8.4186582,
        title: 'Intuitive Robots Lab (Developer)',
        description: 'Software Developer, Robot Web Application',
        performance: ['Requirement Analysis', 'Class Diagram Design', 'Debugging MVP']
    },
    {
        lat: 29.0040702,
        lon: 77.6991360,
        title: 'St. Mary\'s Academy',
        description: 'Klasse 12. Abitur',
        performance: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science']
    }
];

// Add markers for each location
locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lon]).addTo(map);

    marker.bindPopup(`
        <b>${loc.title}</b><br>${loc.description}<br>
        <button onclick="showDetails(${locations.indexOf(loc)})">Click for Details</button>
    `);
});

// Function to dynamically show performance details
function showDetails(locationIndex) {
    const location = locations[locationIndex];
    const detailsContainer = document.getElementById('details'); // A dedicated section for displaying details

    // Clear existing content
    detailsContainer.innerHTML = '';

    // Add title
    const titleElement = document.createElement('h3');
    titleElement.textContent = `Details for ${location.title}`;
    detailsContainer.appendChild(titleElement);

    // Add performance details as a list
    const list = document.createElement('ul');
    location.performance.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);
    });
    detailsContainer.appendChild(list);

    // Ensure the section is visible
    detailsContainer.style.display = 'block';
}

// Ensure map size updates properly
setTimeout(() => {
    map.invalidateSize();
}, 100);