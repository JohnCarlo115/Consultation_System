// searching students
const searchInput = document.querySelector(".search");

searchInput.addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();

    const rows = document.querySelectorAll(
        "#appointmentTable"
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