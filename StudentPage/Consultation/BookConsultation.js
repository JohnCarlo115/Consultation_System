let selectedProfessorName = "Prof. Santos"; // Default fallback

function selectProfessor(cardElement, profName) {
    // 1. Remove selected highlight state from all professor cards
    const allCards = document.querySelectorAll('.prof-card');
    allCards.forEach(card => card.classList.remove('selected'));

    // 2. Add selected highlight state to clicked card
    cardElement.classList.add('selected');

    // 3. Save selected professor name
    selectedProfessorName = profName;
}

function handleBooking(event) {
    event.preventDefault();

    const selectedDate = document.getElementById('date').value;
    const selectedTime = document.getElementById('time').value;
    const topicText = document.getElementById('topic').value;

    const confirmationContainer = document.getElementById('confirmation-message');

    if (!selectedDate || !selectedTime || !topicText) {
        alert("Please complete all booking fields.");
        return;
    }

    confirmationContainer.innerHTML = `
        <div class="success-box">
            <span class="status-badge">Confirmed</span>
            <h3>Booking Successful!</h3>
            <div class="summary-details">
                <p><strong>Faculty:</strong> ${selectedProfessorName}</p>
                <p><strong>Date:</strong> ${selectedDate}</p>
                <p><strong>Time:</strong> ${selectedTime}</p>
                <p><strong>Topic:</strong> ${topicText}</p>
            </div>
            <p class="note">Your appointment request has been added to your records.</p>
        </div>
    `;

    document.getElementById('booking-form').reset();
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}