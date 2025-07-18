interface User {
  username: string;
  email: string;
  password: string;
}

// --- Helper Functions ---

function validateUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{5,15}$/.test(username);
}

function validateEmail(email: string): boolean {
  return /^[\w.-]+@[\w.-]+\.\w+$/.test(email);
}

function validatePassword(password: string): boolean {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

function sanitize(input: string): string {
  return input.replace(/[<>"'\/]/g, "");
}

// --- Main Registration Logic ---

const registerForm = document.getElementById("registerForm") as HTMLFormElement | null;

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Input elements
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("confirmPassword") as HTMLInputElement;

    // Error message elements
    const usernameError = document.getElementById("usernameError") as HTMLElement;
    const emailError = document.getElementById("emailError") as HTMLElement;
    const passwordError = document.getElementById("passwordError") as HTMLElement;
    const confirmPasswordError = document.getElementById("confirmPasswordError") as HTMLElement;

    // Sanitized input values
    const username = sanitize(usernameInput.value.trim());
    const email = sanitize(emailInput.value.trim());
    const password = sanitize(passwordInput.value.trim());
    const confirmPassword = sanitize(confirmPasswordInput.value.trim());

    let valid = true;

    // Validation
    if (!validateUsername(username)) {
      usernameError.textContent = "Username must be 5-15 characters (letters, numbers, underscore).";
      valid = false;
    } else {
      usernameError.textContent = "";
    }

    if (!validateEmail(email)) {
      emailError.textContent = "Invalid email address.";
      valid = false;
    } else {
      emailError.textContent = "";
    }

    if (!validatePassword(password)) {
      passwordError.textContent = "Password must be at least 8 characters, 1 uppercase letter, 1 number.";
      valid = false;
    } else {
      passwordError.textContent = "";
    }

    if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match.";
      valid = false;
    } else {
      confirmPasswordError.textContent = "";
    }

    if (!valid) return;

    const newUser: User = { username, email, password };

    const existingData = localStorage.getItem("allUsers");
    const users: User[] = existingData ? JSON.parse(existingData) : [];

    const isUsernameDuplicate = users.some(user => user.username === username);
    const isEmailDuplicate = users.some(user => user.email === email);

    if (isUsernameDuplicate) {
      alert("Username already exists.");
      return;
    }

    if (isEmailDuplicate) {
      alert("Email already registered.");
      return;
    }

    users.push(newUser);
    localStorage.setItem("allUsers", JSON.stringify(users));

    alert("Registration successful!");
    registerForm.reset();
    window.location.href = "login.html"; // Redirect to login
  });
} else {
  console.error("Register form not found in DOM.");
}
