// Toggle slide-out sidebar menu on mobile
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

// Accordion toggle function for FAQ items
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const icon = button.querySelector('.faq-icon');

    // Close other active FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const otherIcon = item.querySelector('.faq-icon');
            if (otherIcon) otherIcon.textContent = '+';
        }
    });

    // Toggle selected FAQ
    faqItem.classList.toggle('active');
    if (faqItem.classList.contains('active')) {
        icon.textContent = '−';
    } else {
        icon.textContent = '+';
    }
}