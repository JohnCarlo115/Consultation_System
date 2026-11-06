function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

function cancelBooking() {
    if (confirm("Are you sure you want to cancel this consultation appointment?")) {
        alert("Appointment has been canceled.");
        window.location.href = '../Appointment.html';
    }
}