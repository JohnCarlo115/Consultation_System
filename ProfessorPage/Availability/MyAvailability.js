// Toggle slide-out sidebar menu on mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

// Open and Close Modal for Slot Addition
function openSlotModal() {
    document.getElementById('slotModal').classList.add('active');
}

function closeSlotModal() {
    document.getElementById('slotModal').classList.remove('active');
}

// Save New Slot to Table 
function saveSlot(event) {
    event.preventDefault();

    const day = document.getElementById('slotDay').value;
    const time = document.getElementById('slotTime').value;
    const venue = document.getElementById('slotVenue').value;
    const cap = document.getElementById('slotCap').value;

    const tbody = document.getElementById('availability-table-body');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><strong>${day}</strong></td>
        <td>${time}</td>
        <td>${venue}</td>
        <td>${cap}</td>
        <td><span class="status-badge active">Active</span></td>
        <td><button class="btn-action edit" onclick="deleteSlot(this)">Remove</button></td>
    `;
    tbody.appendChild(tr);

    closeSlotModal();
    document.getElementById('slotForm').reset();
}

// Remove Slot Row
function deleteSlot(btn) {
    btn.closest('tr').remove();
}

// Add Blocked / Special Dates
function addBlockedDate() {
    const dateInput = document.getElementById('block-date-input');
    const reasonInput = document.getElementById('block-reason-input');

    const dateVal = dateInput.value;
    const reasonVal = reasonInput.value;

    if (!dateVal) return;

    const list = document.getElementById('blocked-dates-list');
    const li = document.createElement('li');
    li.className = 'blocked-item';
    li.innerHTML = `
        <span>📅 <strong>${dateVal}</strong> - ${reasonVal || 'Off-Campus / Blocked'}</span>
        <button class="btn-remove-sm" onclick="this.parentElement.remove()">✕ Remove</button>
    `;
    list.appendChild(li);

    dateInput.value = '';
    reasonInput.value = '';
}function dismissNotification() {
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