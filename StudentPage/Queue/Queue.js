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
function dismissNotification() {
  const bar = document.getElementById('global-notification-bar');
  if (bar) bar.style.display = 'none';
}

function triggerNotification(message, type = 'info') {
  const bar = document.getElementById('global-notification-bar');
  const msgEl = document.getElementById('notif-message');
  if (!bar || !msgEl) return;

  msgEl.textContent = message;
  bar.style.display = 'flex';

  if (type === 'error') {
    bar.style.backgroundColor = '#fff5f5';
    bar.style.borderLeftColor = '#e53e3e';
    bar.style.color = '#9b2c2c';
  } else if (type === 'success') {
    bar.style.backgroundColor = '#f0fff4';
    bar.style.borderLeftColor = '#38a169';
    bar.style.color = '#276749';
  } else {
    bar.style.backgroundColor = '#ebf8ff';
    bar.style.borderLeftColor = '#3182ce';
    bar.style.color = '#2c5282';
  }
}
function updateSessionTodayLabel() {
  const sessionEl = document.getElementById('session-today-label');
  if (!sessionEl) return;

  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  const todayFormatted = new Date().toLocaleDateString('en-US', options);

  sessionEl.textContent = `Today, ${todayFormatted} • Active Session: 10:00 AM – 12:00 PM`;
  sessionEl.style.color = '#000000';
}
document.addEventListener('DOMContentLoaded', updateSessionTodayLabel);