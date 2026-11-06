// Toggle slide-out sidebar menu on mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

//  Filter Requests by Student Name, Type, and Date
function filterRequests() {
    const searchVal = document.getElementById('req-search').value.toLowerCase();
    const typeVal = document.getElementById('req-type-filter').value;
    const dateVal = document.getElementById('req-date-filter').value;

    const rows = document.querySelectorAll('#requests-table tbody tr');

    rows.forEach(row => {
        const studentName = row.cells[0].textContent.toLowerCase();
        const type = row.cells[1].textContent;
        const reqDate = row.cells[2].textContent;
        const topic = row.cells[4].textContent.toLowerCase();

        const matchesSearch = studentName.includes(searchVal) || topic.includes(searchVal);
        const matchesType = typeVal === '' || type === typeVal;
        const matchesDate = dateVal === '' || reqDate === dateVal;

        if (matchesSearch && matchesType && matchesDate) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

//  Approve Request Action
function approveRequest(btn) {
    const row = btn.closest('tr');
    const studentName = row.cells[0].textContent;
    alert(`Appointment for ${studentName} has been APPROVED.`);
    row.remove();
}

//  Decline Request Action
function declineRequest(btn) {
    const row = btn.closest('tr');
    const studentName = row.cells[0].textContent;
    if (confirm(`Are you sure you want to decline the request from ${studentName}?`)) {
        row.remove();
    }
}

//  Open Reschedule / Modify Schedule Modal
function openModifyModal(btn) {
    const row = btn.closest('tr');
    const studentName = row.cells[0].textContent;
    const currentDate = row.cells[2].textContent;
    const currentTime = row.cells[3].textContent;

    document.getElementById('editRowIndex').value = row.rowIndex;
    document.getElementById('modStudentName').value = studentName;
    document.getElementById('modDate').value = currentDate;
    document.getElementById('modTime').value = currentTime;

    document.getElementById('modifyModal').classList.add('active');
}

function closeModifyModal() {
    document.getElementById('modifyModal').classList.remove('active');
}

// Save Modified Schedule
function saveModifiedSchedule(event) {
    event.preventDefault();

    const rowIndex = document.getElementById('editRowIndex').value;
    const newDate = document.getElementById('modDate').value;
    const newTime = document.getElementById('modTime').value;

    const table = document.getElementById('requests-table');
    if (rowIndex !== '') {
        const row = table.rows[rowIndex];
        row.cells[2].textContent = newDate;
        row.cells[3].textContent = newTime;

        alert(`Schedule updated and APPROVED for ${row.cells[0].textContent}.`);
        row.remove();
    }

    closeModifyModal();
}