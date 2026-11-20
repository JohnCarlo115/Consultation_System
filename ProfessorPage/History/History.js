// Toggle slide-out sidebar menu on mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

// Search and Filter Past Consultation Records
function filterHistory() {
    const searchVal = document.getElementById('history-search').value.toLowerCase();
    const typeVal = document.getElementById('history-type-filter').value;
    const rows = document.querySelectorAll('#history-records-table tbody tr');

    rows.forEach(row => {
        const studentName = row.cells[0].textContent.toLowerCase();
        const type = row.cells[1].textContent;
        const topic = row.cells[4].textContent.toLowerCase();

        const matchesSearch = studentName.includes(searchVal) || topic.includes(searchVal);
        const matchesType = typeVal === '' || type === typeVal;

        row.style.display = (matchesSearch && matchesType) ? '' : 'none';
    });
}
function dismissNotification() {
  const bar = document.getElementById('global-notification-bar');
  if (bar) bar.style.display = 'none';
}

// Call this function whenever an action happens (e.g., booking confirmed, student called)
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