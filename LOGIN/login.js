function handleLogin(event) {
    event.preventDefault();

    const role = document.getElementById('userRole').value;
    const userVal = document.getElementById('username').value.trim();
    const passVal = document.getElementById('password').value.trim();

    // Validation for Admin
    if (role === 'admin') {
        if (userVal === 'admin' && passVal === 'admin123') {
            window.location.href = "../AdminPage/Dashboard/Dashboard.html";
        } else {
            alert("Invalid Admin credentials!\nDemo Login: admin / admin123");
        }
    } 
    // Validation for Student
    else if (role === 'student') {
        if (userVal === 'student' && passVal === 'student123') {
            window.location.href = "../StudentPage/Home/Home.html";
        } else {
            alert("Invalid Student credentials!\nDemo Login: student / student123");
        }
    }
}