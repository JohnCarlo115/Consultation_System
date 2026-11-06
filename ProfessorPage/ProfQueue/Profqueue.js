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