function handleLogin(event) {
    event.preventDefault();

    const role = document.getElementById('userRole').value;
    const userVal = document.getElementById('username').value.trim();
    const passVal = document.getElementById('password').value.trim();

    // 1. Check for empty fields first
    if (!role) {
        alert("Validation Error: Please select a user role.");
        return;
    }

    if (!userVal && !passVal) {
        alert("Validation Error: Please enter your Username and Password.");
        return;
    }

    if (!userVal) {
        alert("Validation Error: Username cannot be empty.");
        return;
    }

    if (!passVal) {
        alert("Validation Error: Password cannot be empty.");
        return;
    }

    if (passVal.length < 6) {
        alert("Validation Error: Password must be at least 6 characters long.");
        return;
    }

    // 2. Your existing role & credential checks (unchanged!)
    if (role === 'admin') {
        if (userVal === 'admin' && passVal === 'admin123') {
            window.location.href = "../AdminPage/Dashboard/Dashboard.html";
        } else {
            alert("Invalid Admin credentials!\nDemo Login: admin / admin123");
        }
    } 
    else if (role === 'student') {
        if (userVal === 'student' && passVal === 'student123') {
            window.location.href = "../StudentPage/Home/Home.html";
        } else {
            alert("Invalid Student credentials!\nDemo Login: student / student123");
        }
    } 
    else if (role === 'professor') {
        if (userVal === 'professor' && passVal === 'professor123') {
            window.location.href = "../ProfessorPage/Dashboard/Dashboard.html";
        } else {
            alert("Invalid Professor credentials!\nDemo Login: professor / professor123");
        }
    }
}