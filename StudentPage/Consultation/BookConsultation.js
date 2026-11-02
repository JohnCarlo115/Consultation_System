function handleBooking(event) {
    event.preventDefault();

    const selectedDate = document.getElementById('date').value;
    const selectedTime = document.getElementById('time').value;
    const topicText = document.getElementById('topic').value;

    const confirmationContainer = document.getElementById('confirmation-message');

    confirmationContainer.innerHTML = `
        <div class="success-box">
            <span class="status-badge">Confirmed</span>
            <h3>Booking Successful!</h3>
            <div class="summary-details">
                <p><strong>Faculty:</strong> Prof. Santos</p>
                <p><strong>Date:</strong> ${selectedDate}</p>
                <p><strong>Time:</strong> ${selectedTime}</p>
                <p><strong>Topic:</strong> ${topicText}</p>
            </div>
            <p class="note">Your appointment request has been added to your records.</p>
        </div>
    `;

    document.getElementById('booking-form').reset();
}
// Function to toggle slide-out sidebar menu on mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) {
        sidebar.classList.toggle('open');
    }

    if (overlay) {
        overlay.classList.toggle('active');
    }
}
function selectProf(element) {
    // 1. Remove active class from all prof cards
    const cards = document.querySelectorAll('.prof-card');
    cards.forEach(card => {
        card.classList.remove('active');
    });
    // 2. Add active class to the clicked card
    element.classList.add('active');
}