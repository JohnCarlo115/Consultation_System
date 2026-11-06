// Download PDF for each appointment
document.querySelectorAll(".downloadBtn").forEach(button => {
    button.addEventListener("click", function () {
        const card = this.closest(".card");

        const profName = card.querySelector(".professorname") ? card.querySelector(".professorname").textContent : "N/A";
        const studentName = card.querySelector(".name").textContent;
        const date = card.querySelector(".date").textContent;
        const time = card.querySelector(".time").textContent;
        const topic = card.querySelector(".topic").textContent;

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Header
        doc.setFont("times", "bold");
        doc.setFontSize(20);
        doc.text("COLLEGE OF COMPUTER STUDIES", 105, 20, { align: "center" });

        doc.setFont("times", "normal");
        doc.setFontSize(10);
        doc.text("STUDENT-FACULTY CONSULTATION SCHEDULING SYSTEM", 105, 28, { align: "center" });

        // Divider
        doc.line(20, 35, 190, 35);

        // Consultation Details
        doc.setFont("times", "bold");
        doc.setFontSize(13);
        doc.text("CONSULTATION RECORD SUMMARY", 20, 50);

        doc.setFont("times", "normal");
        doc.setFontSize(12);
        doc.text("Professor Name: " + profName, 25, 65);
        doc.text("Student Name: " + studentName, 25, 75);
        doc.text("Date: " + date, 25, 85);
        doc.text("Time Slot: " + time, 25, 95);
        
        // Wrapped Topic text for long strings
        const splitTopic = doc.splitTextToSize("Topic: " + topic, 160);
        doc.text(splitTopic, 25, 105);

        // Footer
        doc.line(20, 265, 190, 265);
        doc.setFontSize(10);
        doc.text("Consultation University • Official Record", 105, 273, { align: "center" });

        // Save PDF
        doc.save("Past_Appointment_" + studentName.replace(/\s+/g, '_') + "_" + date.replace(/\s+/g, '_') + ".pdf");
    });
});

// Sidebar Mobile Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

// Live Search Filter
const searchInput = document.querySelector(".search");
if (searchInput) {
    searchInput.addEventListener("input", function() {
        const searchValue = this.value.toLowerCase();
        const cards = document.querySelectorAll(".historytable");

        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            if (text.includes(searchValue)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}