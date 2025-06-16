"use strict";
// This TypeScript runs on the home page and controls login/profile visibility
// Target the placeholder div in the navbar
const authControl = document.getElementById("authControl");
// Utility: Create an element with optional class and text
function createElement(tag, className, textContent) {
    const el = document.createElement(tag);
    if (className)
        el.className = className;
    if (textContent)
        el.textContent = textContent;
    return el;
}
// Check localStorage for login status
const data = localStorage.getItem("loggedInUser");
if (data) {
    // Logged in user exists
    const user = JSON.parse(data);
    const container = createElement("div", "profile-container");
    const usernameSpan = createElement("span", "profile-name", `👤 ${user.username}`);
    usernameSpan.style.color = "white";
    usernameSpan.style.marginRight = "10px";
    const logoutBtn = createElement("button", "logout-btn", "Logout");
    logoutBtn.style.padding = "4px 10px";
    logoutBtn.style.border = "none";
    logoutBtn.style.borderRadius = "4px";
    logoutBtn.style.cursor = "pointer";
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        location.reload();
    });
    container.appendChild(usernameSpan);
    container.appendChild(logoutBtn);
    authControl.appendChild(container);
}
else {
    // No user logged in, show login link
    const li = createElement("li", "loginli");
    const loginLink = createElement("a", "login-link", "Login");
    loginLink.setAttribute("href", "./login.html");
    li.appendChild(loginLink);
    authControl.appendChild(li);
}
// const menuBtn = document.getElementById('menu-btn');
// const navLinks = document.getElementById('nav-links');
function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    if (navLinks)
        navLinks.classList.toggle("show");
}
