// viewing of appointments
document.querySelectorAll(".view-btn").forEach(button => {
    button.addEventListener("click", function() {
        const student = this.dataset.student;

        alert("Viewing appointment details for " + student);
    });
});

// quick actions
document.querySelectorAll(".action-btn").forEach(button => {
    button.addEventListener("click", function() {
        const action = this.dataset.action;

        alert("Opening " + action + "...");
    });
});


// searching students
const searchInput = document.querySelector(".search");

searchInput.addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();

    const rows = document.querySelectorAll(
        "#appointmentTable tr"
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
    item.addEventListener("click", function() {

        menuItems.forEach(menu => {
            menu.classList.remove("active");
        });

        this.classList.add("active");
    });
});

console.log("Consultation University Dashboard Loaded!");