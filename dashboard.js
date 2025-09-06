// Theme Management
let isDarkMode = false;

function toggleTheme() {
isDarkMode = !isDarkMode;
document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Initialize theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
isDarkMode = true;
document.body.setAttribute('data-theme', 'dark');
}

// Navigation
function showPage(pageId) {
const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-item');

pages.forEach(page => {
page.style.display = 'none';
page.classList.remove('active');
});

navItems.forEach(item => {
item.classList.remove('active');
});

const selectedPage = document.getElementById(pageId);
const selectedNav = document.querySelector([data-page="${pageId}"]);

if (selectedPage) {
selectedPage.style.display = 'block';
selectedPage.classList.add('active');
}

if (selectedNav) {
selectedNav.classList.add('active');
}

// Initialize charts when showing attendance or leaves pages
if (pageId === 'attendance') {
initializeAttendanceChart();
} else if (pageId === 'leaves') {
initializeLeavesChart();
}
}

// Mock Data
const subjects = [
{ name: 'Computer Science', status: 'present', time: '09:00 AM' },
{ name: 'Mathematics', status: 'present', time: '11:00 AM' },
{ name: 'Physics', status: 'absent', time: '01:00 PM' },
{ name: 'English Literature', status: 'late', time: '03:00 PM' }
];

const subjectReports = [
{ name: 'Computer Science', attended: 45, total: 50 },
{ name: 'Mathematics', attended: 38, total: 45 },
{ name: 'Physics', attended: 40, total: 48 },
{ name: 'Chemistry', attended: 35, total: 42 },
{ name: 'English', attended: 30, total: 40 }
];

// Initialize Subject List
function initializeSubjects() {
const subjectsList = document.getElementById('subjectsList');
subjectsList.innerHTML = '';

subjects.forEach(subject => {
const statusIcon = {
present: '✓',
absent: '✕',
late: '⏰'
}[subject.status];

const statusClass = {
present: 'text-green-600',
absent: 'text-red-600',
late: 'text-yellow-600'
}[subject.status];

const subjectItem = document.createElement('div');
subjectItem.className = 'subject-item';
subjectItem.innerHTML = `
<div class="subject-info">
<div class="status-icon ${statusClass}">${statusIcon}</div>
<div>
    <div class="subject-name">${subject.name}</div>
    <div class="subject-time">${subject.time}</div>
</div>
</div>
<div class="status-badge ${subject.status}">
${subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}
</div>
`;

subjectsList.appendChild(subjectItem);
});
}

// Initialize Reports
function initializeReports() {
const reportsContainer = document.querySelector('.subject-reports');
reportsContainer.innerHTML = '';

subjectReports.forEach(subject => {
const percentage = Math.round((subject.attended / subject.total) * 100);
const statusClass = percentage >= 85 ? 'good' : percentage >= 75 ? 'warning' : 'danger';

const reportCard = document.createElement('div');
reportCard.className = 'card';
reportCard.innerHTML = `
<h4>${subject.name}</h4>
<div class="attendance-bar">
<div class="attendance-progress" style="width: ${percentage}%"></div>
</div>
<div class="attendance-stats">
<span>Classes Attended: ${subject.attended}/${subject.total}</span>
<span>${percentage}%</span>
</div>
<p class="attendance-status ${statusClass}">
${percentage >= 85 ? 'Excellent attendance!' : 
    percentage >= 75 ? 'Attendance is satisfactory' : 
    'Need to improve attendance'}
</p>
`;

reportsContainer.appendChild(reportCard);
});
}

// Initialize Charts
function initializeAttendanceChart() {
const ctx = document.getElementById('attendanceChart').getContext('2d');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const attendanceData = [88, 92, 85, 94, 78, 82, 90, 85, 82];
const avgClassesData = [92, 90, 88, 89, 86, 87, 91, 88, 85];

new Chart(ctx, {
type: 'line',
data: {
labels: months,
datasets: [
{
    label: 'Your Attendance %',
    data: attendanceData,
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    fill: true,
    tension: 0.4
},
{
    label: 'Class Average %',
    data: avgClassesData,
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    fill: true,
    tension: 0.4
}
]
},
options: {
responsive: true,
scales: {
y: {
    beginAtZero: false,
    min: 70,
    max: 100
}
}
}
});
}

function initializeLeavesChart() {
const ctx = document.getElementById('leavesChart').getContext('2d');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const sickLeaves = [2, 1, 3, 0, 2, 1, 0, 1, 2];
const personalLeaves = [1, 2, 0, 1, 0, 1, 2, 0, 1];
const emergencyLeaves = [0, 0, 1, 0, 0, 0, 0, 1, 0];

new Chart(ctx, {
type: 'bar',
data: {
labels: months,
datasets: [
{
    label: 'Sick Leaves',
    data: sickLeaves,
    backgroundColor: 'rgba(239, 68, 68, 0.7)',
    borderRadius: 4
},
{
    label: 'Personal Leaves',
    data: personalLeaves,
    backgroundColor: 'rgba(59, 130, 246, 0.7)',
    borderRadius: 4
},
{
    label: 'Emergency Leaves',
    data: emergencyLeaves,
    backgroundColor: 'rgba(245, 158, 11, 0.7)',
    borderRadius: 4
}
]
},
options: {
responsive: true,
scales: {
y: {
    beginAtZero: true,
    ticks: {
    stepSize: 1
    }
}
}
}
});
}

// Initialize Heatmaps
function initializeHeatmaps() {
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hours = Array.from({ length: 9 }, (_, i) => ${i + 8}:00);

function createHeatmapTable(containerId) {
const container = document.getElementById(containerId);
container.innerHTML = '';

const table = document.createElement('table');
table.className = 'w-full';

// Create header row
const thead = document.createElement('thead');
const headerRow = document.createElement('tr');
headerRow.innerHTML = `<th></th>${hours.map(hour => <th>${hour}</th>).join('')}`;
thead.appendChild(headerRow);
table.appendChild(thead);

// Create body rows
const tbody = document.createElement('tbody');
days.forEach(day => {
const row = document.createElement('tr');
row.innerHTML = `
<td>${day}</td>
${hours.map(() => {
    const value = Math.random();
    const color = value > 0.8 ? 'bg-green-500' :
                value > 0.6 ? 'bg-green-300' :
                value > 0.4 ? 'bg-yellow-300' :
                value > 0.2 ? 'bg-red-300' :
                'bg-red-500';
    return <td class="${color} opacity-75"></td>;
}).join('')}
`;
tbody.appendChild(row);
});
table.appendChild(tbody);

container.appendChild(table);
}

createHeatmapTable('attendanceHeatmap');
}

// Toggle profile dropdown
function toggleProfileDropdown() {
const dropdown = document.getElementById('logoutDropdown');
if (dropdown.style.display === 'block') {
dropdown.style.display = 'none';
} else {
dropdown.style.display = 'block';
}
}

// Logout function
function handleLogout() {
window.location.href = 'index.html';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
// Theme toggle
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
item.addEventListener('click', () => {
const pageId = item.getAttribute('data-page');
showPage(pageId);
});
});

// Profile Modal
const profileModal = document.getElementById('profileModal');
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', () => {
profileModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
if (e.target === profileModal) {
profileModal.style.display = 'none';
}
});

// Profile Badge
const profileBadge = document.getElementById('profileBadge');
profileBadge.addEventListener('click', toggleProfileDropdown);

// Logout Button
const logoutButton = document.querySelector('.logout-button');
logoutButton.addEventListener('click', (e) => {
e.preventDefault();
window.location.href = 'index.html';
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
const dropdown = document.getElementById('logoutDropdown');
const profileBadge = document.getElementById('profileBadge');

if (!profileBadge.contains(e.target) && !dropdown.contains(e.target)) {
dropdown.style.display = 'none';
}
});

// Calendar Toggle
const calendarToggle = document.getElementById('calendarToggle');
const calendarContainer = document.getElementById('calendarContainer');

calendarToggle.addEventListener('click', () => {
calendarContainer.classList.toggle('hidden');
});

// Date Selection
const dateSelector = document.getElementById('dateSelector');
dateSelector.value = new Date().toISOString().split('T')[0];

dateSelector.addEventListener('change', (e) => {
const selectedDate = new Date(e.target.value);
const dateDisplay = document.querySelector('.attendance-list .date');
dateDisplay.textContent = selectedDate.toLocaleDateString('en-US', {
weekday: 'long',
year: 'numeric',
month: 'long',
day: 'numeric'
});
});

// Forms
document.getElementById('queryForm')?.addEventListener('submit', (e) => {
e.preventDefault();
alert('Query submitted successfully!');
e.target.reset();
});

document.getElementById('passwordForm')?.addEventListener('submit', (e) => {
e.preventDefault();
alert('Password changed successfully!');
e.target.reset();
});

document.getElementById('contactForm')?.addEventListener('submit', (e) => {
e.preventDefault();
alert('Message sent successfully!');
e.target.reset();
});

// Initialize components
initializeSubjects();
initializeReports();
initializeHeatmaps();
showPage('dashboard');
});
// Example attendance data (replace with your real data source)
const attendanceData = {
"2025-04-25": [
    { time: "09:00 AM", subject: "Mathematics", status: "Present" },
    { time: "10:00 AM", subject: "Physics", status: "Absent" },
    { time: "11:00 AM", subject: "Chemistry", status: "Present" }
],
"2025-04-26": [
    { time: "09:00 AM", subject: "Mathematics", status: "Absent" },
    { time: "10:00 AM", subject: "Physics", status: "Present" },
    { time: "11:00 AM", subject: "Chemistry", status: "Present" }
]
};

function renderAttendanceTable(date) {
const tableBody = document.getElementById('attendance-table-body');
tableBody.innerHTML = '';
const records = attendanceData[date] || [];
if (records.length === 0) {
    tableBody.innerHTML = <tr><td colspan="3" style="padding: 1rem; text-align: center; color: #888;">No attendance records for this date.</td></tr>;
    return;
}
records.forEach(record => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td style="padding: 0.75rem 1rem;">${record.time}</td>
    <td style="padding: 0.75rem 1rem;">${record.subject}</td>
    <td style="padding: 0.75rem 1rem;">
        <span class="status-badge ${record.status.toLowerCase()}">${record.status}</span>
    </td>
    `;
    tableBody.appendChild(row);
});
}

// Set today's date as default and render
const dateInput = document.getElementById('attendance-date');
const today = new Date();
const todayStr = today.toISOString().split('T')[0];
dateInput.value = todayStr;
renderAttendanceTable(todayStr);

// Update table on date change
dateInput.addEventListener('change', (e) => {
renderAttendanceTable(e.target.value);
});
