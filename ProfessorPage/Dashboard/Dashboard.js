// Toggle slide-out sidebar menu on mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

// Call Next Student Logic for Professor Dashboard
function callNextStudent() {
    const display = document.getElementById('current-student-display');
    const students = [
        "John Carlo S. Cruz (#2) • Networking Protocol ACL Setup",
        "Ana Reyes (#3) • Database Query Optimization",
        "Mark Banalan (#4) • Capstone System Architecture"
    ];

    const nextStudent = students.shift();
    if (nextStudent) {
        display.innerHTML = `Now Serving: <strong>${nextStudent}</strong>`;
    } else {
        display.innerHTML = `No more students in line.`;
    }
}