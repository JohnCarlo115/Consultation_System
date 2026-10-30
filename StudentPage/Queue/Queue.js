// Function to load queue from dynamic appointment storage or default queue state
function loadQueueData() {
    const appointments = JSON.parse(localStorage.getItem('student_appointments')) || [];
    const latestAppt = appointments[appointments.length - 1];

    const profEl = document.getElementById('queue-prof');
    const topicEl = document.getElementById('queue-topic');
    const posEl = document.getElementById('queue-pos');
    const container = document.getElementById('queue-list-container');

    if (latestAppt) {
        if (profEl) profEl.textContent = latestAppt.profName;
        if (topicEl) topicEl.textContent = latestAppt.topic || 'Consultation Session';
        if (posEl) posEl.textContent = `#${latestAppt.queueNo || 2}`;
    }

    const mockQueueList = [
        { num: 1, name: 'Student #1 (Serving)', status: 'In Session', isUser: false },
        { num: latestAppt ? latestAppt.queueNo : 2, name: 'John Carlo S. Cruz (You)', status: 'Waiting', isUser: true },
        { num: (latestAppt ? latestAppt.queueNo : 2) + 1, name: 'Student #3', status: 'Waiting', isUser: false }
    ];

    if (container) {
        container.innerHTML = mockQueueList.map(item => `
            <div class="queue-item ${item.isUser ? 'current-user' : ''}">
                <span class="queue-num">#${item.num}</span>
                <span class="queue-name">${item.name}</span>
                <span class="queue-status ${item.status === 'In Session' ? 'status-serving' : 'status-waiting'}">${item.status}</span>
            </div>
        `).join('');
    }
}

// Toggle slide-out sidebar menu on mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    loadQueueData();
});