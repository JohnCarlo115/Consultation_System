function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

function filterStudents() {
    const input = document.getElementById('studSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#studentTable tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(input) ? '' : 'none';
    });
}

function openAddModal() {
    document.getElementById('modalTitle').innerText = 'Add New Student';
    document.getElementById('studentForm').reset();
    document.getElementById('editRowIndex').value = '';
    document.getElementById('studentModal').classList.add('active');
}

function closeModal() {
    document.getElementById('studentModal').classList.remove('active');
}

function editStudent(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    document.getElementById('modalTitle').innerText = 'Edit Student Details';
    document.getElementById('studId').value = cells[0].textContent.trim();
    document.getElementById('studName').value = cells[1].textContent.trim();
    document.getElementById('studSection').value = cells[2].textContent.trim();
    document.getElementById('studCourse').value = cells[3].textContent.trim();

    document.getElementById('editRowIndex').value = row.rowIndex;
    document.getElementById('studentModal').classList.add('active');
}

function saveStudent(event) {
    event.preventDefault();

    const id = document.getElementById('studId').value;
    const name = document.getElementById('studName').value;
    const section = document.getElementById('studSection').value;
    const course = document.getElementById('studCourse').value;
    const rowIndex = document.getElementById('editRowIndex').value;

    const table = document.getElementById('studentTable');

    if (rowIndex !== '') {
        const row = table.rows[rowIndex];
        row.cells[0].innerHTML = `<strong>${id}</strong>`;
        row.cells[1].textContent = name;
        row.cells[2].textContent = section;
        row.cells[3].textContent = course;
    } else {
        const tbody = table.querySelector('tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><strong>${id}</strong></td>
            <td>${name}</td>
            <td>${section}</td>
            <td>${course}</td>
            <td><span class="status-badge active">Active</span></td>
            <td><button class="btn-action edit" onclick="editStudent(this)">✏️ Edit</button></td>
        `;
        tbody.appendChild(newRow);
    }

    closeModal();
}