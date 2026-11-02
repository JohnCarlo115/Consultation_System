function toggleFaq(card) {
    const isOpen = card.classList.contains('open');
    
    // Close all other open FAQ cards
    document.querySelectorAll('.faq-card').forEach(item => {
        item.classList.remove('open');
    });

    // Toggle clicked card
    if (!isOpen) {
        card.classList.add('open');
    }
}