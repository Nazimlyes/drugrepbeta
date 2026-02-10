// ========================
// DOCTORS ARRAY
// ========================
const doctors = [
  { id: "batata_yasmine", name: "Dr. Batata Yasmine", specialty: "Endocrinologie", commune: "Alger El Annasser", opening: "08:00", coords: [36.7258, 3.0939] },
  { id: "ad_hocine", name: "Dr. Ad Hocine", specialty: "Médecine Interne", commune: "El Harrach", opening: "08:00", coords: [36.7211, 3.1376] },
  { id: "azoug_asma", name: "Dr. Azoug Asma", specialty: "Médecine Interne", commune: "El Harrach", opening: "08:00", coords: [36.7195, 3.1402] },
  { id: "abdelhamid_sihem", name: "Dr. Abdelhamid Sihem", specialty: "Médecine Générale", commune: "Alger El Annasser", opening: "08:30", coords: [36.7245, 3.0912] },
  { id: "amdidouche_karima", name: "Dr. Amdidouche Karima", specialty: "Médecine Générale", commune: "Bachedjerah", opening: "08:30", coords: [36.7324, 3.1048] },
  { id: "bechaa_souhila", name: "Dr. Bechaa Souhila", specialty: "Médecine Générale", commune: "Kouba", opening: "09:00", coords: [36.7113, 3.0864] }
];

// ========================
// MAP SETUP
// ========================
const map = L.map("map").setView([36.7538, 3.0588], 12);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Add markers
const markers = {};
doctors.forEach(doc => {
  markers[doc.id] = L.marker(doc.coords)
    .addTo(map)
    .bindPopup(`<strong>${doc.name}</strong><br>${doc.specialty}`);
});

// ========================
// LINK DOCTORS TO MAP
// ========================
const doctorListEl = document.getElementById("doctorList");
doctors.forEach(doc => {
  const li = document.createElement("li");
  li.innerHTML = `<button class="w-full text-left p-2 hover:bg-purple-50 rounded">${doc.name} - ${doc.specialty}</button>`;
  
  li.querySelector("button").addEventListener("click", () => {
    map.flyTo(doc.coords, 16, { duration: 1.2 });
    markers[doc.id].openPopup();
  });

  doctorListEl.appendChild(li);
});

// ========================
// CHART.JS ANALYTICS
// ========================
const ctx = document.getElementById("analyticsChart").getContext("2d");
const analyticsChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Visits Completed",
        data: [5, 3, 4, 2, 6],
        backgroundColor: "#7c3aed",
      },
      {
        label: "Pending Tasks",
        data: [2, 1, 3, 2, 1],
        backgroundColor: "#c084fc",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  },
});
// ========================
// DARK MODE TOGGLE
// ========================
const darkModeBtn = document.querySelector(".navbar .btn:nth-child(2)"); // second button
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});