let currentRowToDecline = null;

// Open Decline Modal pop-up window
function declineRequest(button) {
    currentRowToDecline = button.closest('tr');
    const modal = document.getElementById('declineModal');
    const input = document.getElementById('declineReasonInput');
    
    if (input) input.value = '';
    if (modal) modal.style.display = 'flex';
}

// Close Decline Modal
function closeDeclineModal() {
    currentRowToDecline = null;
    const modal = document.getElementById('declineModal');
    if (modal) modal.style.display = 'none';
}

// Confirm Decline and remove row from table
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

// Approve Request directly
function approveRequest(button) {
    const row = button.closest('tr');
    const studentName = row.cells[0].innerText.trim();

    if (confirm(`Approve consultation request for ${studentName}?`)) {
        row.remove();
    }
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
    if (modal) modal.style.display = 'flex';
}

// Close Reschedule Modal
function closeModifyModal() {
    const modal = document.getElementById('modifyModal');
    if (modal) modal.style.display = 'none';
}

// Save Modified Schedule
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

// Sidebar Drawer Toggle Handler
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}