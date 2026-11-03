function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

function filterSchedules() {
    const input = document.getElementById('schedSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#schedTable tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(input) ? '' : 'none';
    });
}

function openAddSchedModal() {
    document.getElementById('schedModalTitle').innerText = 'Create Consultation Schedule';
    document.getElementById('schedForm').reset();
    document.getElementById('editRowIndexSched').value = '';
    document.getElementById('schedModal').classList.add('active');
}

function closeSchedModal() {
    document.getElementById('schedModal').classList.remove('active');
}

function editSched(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    document.getElementById('schedModalTitle').innerText = 'Edit Consultation Schedule';
    document.getElementById('schedProf').value = cells[0].textContent.trim();
    document.getElementById('schedTime').value = cells[1].textContent.trim();
    document.getElementById('schedRoom').value = cells[2].textContent.trim();
    document.getElementById('schedCap').value = cells[3].textContent.trim();

    document.getElementById('editRowIndexSched').value = row.rowIndex;
    document.getElementById('schedModal').classList.add('active');
}

function saveSched(event) {
    event.preventDefault();

    const prof = document.getElementById('schedProf').value;
    const time = document.getElementById('schedTime').value;
    const room = document.getElementById('schedRoom').value;
    const cap = document.getElementById('schedCap').value;
    const rowIndex = document.getElementById('editRowIndexSched').value;

    const table = document.getElementById('schedTable');

    if (rowIndex !== '') {
        const row = table.rows[rowIndex];
        row.cells[0].innerHTML = `<strong>${prof}</strong>`;
        row.cells[1].textContent = time;
        row.cells[2].textContent = room;
        row.cells[3].textContent = cap;
    } else {
        const tbody = table.querySelector('tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><strong>${prof}</strong></td>
            <td>${time}</td>
            <td>${room}</td>
            <td>${cap}</td>
            <td><span class="status-badge active">Active</span></td>
            <td><button class="btn-action edit" onclick="editSched(this)">✏️ Edit</button></td>
        `;
        tbody.appendChild(newRow);
    }

    closeSchedModal();
}