// Toggle slide-out sidebar menu on mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

// Open and Close Modal for Slot Addition (3.2.3.2)
function openSlotModal() {
    document.getElementById('slotModal').classList.add('active');
}

function closeSlotModal() {
    document.getElementById('slotModal').classList.remove('active');
}

// Save New Slot to Table (3.2.3.2 & 3.2.3.3)
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

// Add Blocked / Special Dates (3.2.3.5)
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
}