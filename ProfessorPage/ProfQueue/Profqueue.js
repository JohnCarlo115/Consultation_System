function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

let completedCount = 5;

// Call Next Student Logic
function callNextStudent() {
    const display = document.getElementById('current-serving-display');
    const tableBody = document.querySelector('#queue-roster-table tbody');

    if (!tableBody || tableBody.rows.length <= 1) {
        if (display) display.innerHTML = `No more students waiting in queue.`;
        return;
    }

    // Advance queue: remove finished student #1
    tableBody.deleteRow(0);
    completedCount++;
    document.getElementById('completed-count').textContent = completedCount;

    // Update new #1 student
    const newFirstRow = tableBody.rows[0];
    if (newFirstRow) {
        newFirstRow.cells[0].innerHTML = `<strong>#1</strong>`;
        newFirstRow.cells[3].innerHTML = `<span class="status-badge active">In Session</span>`;
        newFirstRow.cells[4].innerHTML = `<button class="btn-action edit" onclick="completeSession(this)">Complete Session</button>`;

        const studentName = newFirstRow.cells[1].textContent;
        const topic = newFirstRow.cells[2].textContent;
        if (display) {
            display.innerHTML = `Now Serving: <strong>${studentName} (#1)</strong> • ${topic}`;
        }
    }
}

function completeSession(btn) {
    callNextStudent();
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