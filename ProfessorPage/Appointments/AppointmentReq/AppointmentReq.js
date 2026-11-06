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

// searching students
const searchInput = document.querySelector(".search");

searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();

    const rows = document.querySelectorAll(
        "#request"
    );

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();

        if (text.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});


const menuItems = document.querySelectorAll(".sidebar li");

menuItems.forEach(item => {
    item.addEventListener("click", function () {

        menuItems.forEach(menu => {
            menu.classList.remove("active");
        });

        this.classList.add("active");
    });
});

// approve, reject, modify
let modal = document.getElementById("modal");

let rejectSection = document.getElementById("rejectSection");
let modifySection = document.getElementById("modifySection");

let selectedAction = "";
let selectedCard = null;


// APPROVE
document.querySelectorAll(".approve").forEach(button => {

    button.addEventListener("click", function () {

        let card = this.closest(".request-card");

        card.querySelector(".status").textContent = "Approved";

    });

});


// REJECT
document.querySelectorAll(".reject").forEach(button => {

    button.addEventListener("click", function () {

        selectedCard = this.closest(".request-card");
        selectedAction = "reject";

        rejectSection.style.display = "block";
        modifySection.style.display = "none";

        document.getElementById("modalTitle").textContent = "Reject Appointment";
        document.getElementById("reason").value = "";

        modal.style.display = "flex";

    });

});


// MODIFY
document.querySelectorAll(".modify").forEach(button => {

    button.addEventListener("click", function () {

        selectedCard = this.closest(".request-card");
        selectedAction = "modify";

        rejectSection.style.display = "none";
        modifySection.style.display = "block";

        document.getElementById("modalTitle").textContent = "Modify Appointment";

        // Get existing date
        let date = new Date(
            selectedCard.querySelector(".date").textContent
        );

        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let day = String(date.getDate()).padStart(2, "0");

        document.getElementById("newDate").value =
            `${year}-${month}-${day}`;

        // Get existing time
        let time = selectedCard.querySelector(".time").textContent;

        let [clock, period] = time.split(" ");
        let [hours, minutes] = clock.split(":");

        hours = Number(hours);

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        document.getElementById("newTime").value =
            `${String(hours).padStart(2, "0")}:${minutes}`;

        modal.style.display = "flex";

    });

});


// SAVE
document.getElementById("saveBtn").addEventListener("click", function () {

    if (selectedAction === "reject") {

        let reason = document.getElementById("reason").value;

        if (reason.trim() === "") return;

        selectedCard.querySelector(".status").textContent = "Rejected";

        selectedCard.querySelector(".reason").textContent =
            "Reason: " + reason;

    }

    if (selectedAction === "modify") {

        let date = document.getElementById("newDate").value;
        let time = document.getElementById("newTime").value;

        if (!date || !time) return;

        let formattedDate = new Date(date + "T00:00:00")
            .toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

        let formattedTime = new Date("2000-01-01T" + time)
            .toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit"
            });

        selectedCard.querySelector(".date").textContent = formattedDate;
        selectedCard.querySelector(".time").textContent = formattedTime;

        selectedCard.querySelector(".status").textContent = "Modified";

    }

    modal.style.display = "none";

});


// CLOSE
document.getElementById("closeBtn").addEventListener("click", function () {

    modal.style.display = "none";

});