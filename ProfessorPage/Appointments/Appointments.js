let currentRowToDecline = null;

// Open Decline Modal
function declineRequest(button) {
    currentRowToDecline = button.closest('tr');
    const modal = document.getElementById('declineModal');
    const input = document.getElementById('declineReasonInput');
    
    if (input) input.value = '';
    if (modal) {
        modal.style.setProperty('display', 'flex', 'important');
        modal.style.setProperty('opacity', '1', 'important');
        modal.style.setProperty('visibility', 'visible', 'important');
    }
}

// Close Decline Modal
function closeDeclineModal() {
    currentRowToDecline = null;
    const modal = document.getElementById('declineModal');
    if (modal) {
        modal.style.setProperty('display', 'none', 'important');
        modal.style.setProperty('opacity', '0', 'important');
        modal.style.setProperty('visibility', 'hidden', 'important');
    }
}

// Confirm Decline & Remove Row
function confirmDeclineRequest() {
    const reason = document.getElementById('declineReasonInput').value.trim();

    if (!reason) {
        alert("Please state a reason before declining.");
        return;
    }

    if (currentRowToDecline) {
        currentRowToDecline.remove();
    }

    closeDeclineModal();
}

// Open Reschedule Modal
function openModifyModal(button) {
    const row = button.closest('tr');
    const studentName = row.cells[0].innerText.trim();
    const dateVal = row.cells[2].innerText.trim();
    const timeVal = row.cells[3].innerText.trim();

    document.getElementById('modStudentName').value = studentName;
    document.getElementById('modDate').value = dateVal;
    document.getElementById('modTime').value = timeVal;
    document.getElementById('editRowIndex').value = row.rowIndex;

    const modal = document.getElementById('modifyModal');
    if (modal) {
        modal.style.setProperty('display', 'flex', 'important');
        modal.style.setProperty('opacity', '1', 'important');
        modal.style.setProperty('visibility', 'visible', 'important');
    }
}

// Close Reschedule Modal
function closeModifyModal() {
    const modal = document.getElementById('modifyModal');
    if (modal) {
        modal.style.setProperty('display', 'none', 'important');
        modal.style.setProperty('opacity', '0', 'important');
        modal.style.setProperty('visibility', 'hidden', 'important');
    }
}

// Save Reschedule Changes
function saveModifiedSchedule(event) {
    event.preventDefault();
    const rowIndex = document.getElementById('editRowIndex').value;
    const table = document.getElementById('requests-table');
    
    if (table && rowIndex) {
        const row = table.rows[rowIndex];
        if (row) {
            row.cells[2].innerText = document.getElementById('modDate').value;
            row.cells[3].innerText = document.getElementById('modTime').value;
        }
    }

    closeModifyModal();
    alert("Schedule updated successfully!");
}

let currentRowToApprove = null;

// Open Custom Approve Modal
function approveRequest(button) {
    currentRowToApprove = button.closest('tr');
    const studentName = currentRowToApprove.cells[0].innerText.trim();
    
    document.getElementById('approveStudentName').innerText = studentName;
    
    const modal = document.getElementById('approveModal');
    if (modal) {
        modal.style.setProperty('display', 'flex', 'important');
        modal.style.setProperty('opacity', '1', 'important');
        modal.style.setProperty('visibility', 'visible', 'important');
    }
}

// Close Approve Modal
function closeApproveModal() {
    currentRowToApprove = null;
    const modal = document.getElementById('approveModal');
    if (modal) {
        modal.style.setProperty('display', 'none', 'important');
        modal.style.setProperty('opacity', '0', 'important');
        modal.style.setProperty('visibility', 'hidden', 'important');
    }
}

// Confirm Approval & Remove Row
function confirmApproveRequest() {
    if (currentRowToApprove) {
        currentRowToApprove.remove();
    }
    closeApproveModal();
}

// Sidebar Drawer Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
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