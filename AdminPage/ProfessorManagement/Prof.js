function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

function filterProfessors() {
    const input = document.getElementById('profSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#profTable tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(input) ? '' : 'none';
    });
}

function openAddProfModal() {
    document.getElementById('profModalTitle').innerText = 'Add New Professor';
    document.getElementById('profForm').reset();
    document.getElementById('editRowIndexProf').value = '';
    document.getElementById('profModal').classList.add('active');
}

function closeProfModal() {
    document.getElementById('profModal').classList.remove('active');
}

function editProf(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    document.getElementById('profModalTitle').innerText = 'Edit Professor Details';
    document.getElementById('profName').value = cells[0].textContent.trim();
    document.getElementById('profDept').value = cells[1].textContent.trim();
    document.getElementById('profEmail').value = cells[2].textContent.trim();

    document.getElementById('editRowIndexProf').value = row.rowIndex;
    document.getElementById('profModal').classList.add('active');
}

function saveProf(event) {
    event.preventDefault();

    const name = document.getElementById('profName').value;
    const dept = document.getElementById('profDept').value;
    const email = document.getElementById('profEmail').value;
    const rowIndex = document.getElementById('editRowIndexProf').value;

    const table = document.getElementById('profTable');

    if (rowIndex !== '') {
        const row = table.rows[rowIndex];
        row.cells[0].innerHTML = `<strong>${name}</strong>`;
        row.cells[1].textContent = dept;
        row.cells[2].textContent = email;
    } else {
        const tbody = table.querySelector('tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><strong>${name}</strong></td>
            <td>${dept}</td>
            <td>${email}</td>
            <td><span class="status-badge active">Available</span></td>
            <td><button class="btn-action edit" onclick="editProf(this)">✏️ Edit</button></td>
        `;
        tbody.appendChild(newRow);
    }

    closeProfModal();
}