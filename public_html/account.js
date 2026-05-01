// register
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const existingUser = accounts.find(account => account.username === username);

    if (existingUser) {
      message.textContent = "Username already exists.";
      return;
    }

    accounts.push({
      username: username,
      password: password
    });

    localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.removeItem("username");

    message.textContent = "Account created. Please log in.";

    setTimeout(function() {
      window.location.href = "/login";
    }, 1000);
  });
}

// login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const user = accounts.find(account => account.username === username);

    if (!user) {
      message.textContent = "Username not found.";
      return;
    }

    if (user.password !== password) {
      message.textContent = "Incorrect password.";
      return;
    }

    localStorage.setItem("username", username);
    window.location.href = "/home";
  });
}
// show login/user section
const savedUsername = localStorage.getItem("username");
if (document.getElementById("loginSection") && document.getElementById("userSection")) {
  if (savedUsername) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("userSection").style.display = "block";
    document.getElementById("welcome").textContent = "Hello, " + savedUsername;
  } else {
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("userSection").style.display = "none";
  }
}
// logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function() {
    localStorage.removeItem("username");
    window.location.href = "/login";
  });
}
// view orders
const ordersBtn = document.getElementById("ordersBtn");

if (ordersBtn) {
  ordersBtn.addEventListener("click", function() {
    window.location.href = "/orders";
  });
}
