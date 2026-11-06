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