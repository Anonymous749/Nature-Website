"use strict";
const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
if (form && usernameInput && passwordInput && usernameError && passwordError) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;
        // Username validation
        if (username.length < 10 || username.length > 15) {
            usernameError.textContent = "Username must be 10 to 15 characters long.";
            isValid = false;
        }
        else {
            usernameError.textContent = "";
        }
        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            passwordError.textContent =
                "Password must be at least 8 characters long, include one uppercase letter and one number.";
            isValid = false;
        }
        else {
            passwordError.textContent = "";
        }
        if (!isValid)
            return;
        const data = localStorage.getItem("allUsers");
        if (!data) {
            alert("No registered users found.");
            return;
        }
        try {
            const users = JSON.parse(data);
            const userFound = users.find((user) => user.username === username && user.password === password);
            if (userFound) {
                alert("Login successful!");
                // ✅ Save login session for dynamic profile rendering
                localStorage.setItem("loggedInUser", JSON.stringify(userFound));
                form.reset();
                window.location.href = "./../main/index.html"; // Redirect to homepage
            }
            else {
                alert("Invalid username or password.");
            }
        }
        catch (err) {
            console.error("Error reading user data from localStorage:", err);
            alert("Something went wrong while logging in.");
        }
    });
}
else {
    console.error("Form or input elements not found.");
}
