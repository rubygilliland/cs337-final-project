
//login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: username, password: password })
    });
    const result = await response.json();

    if (result.message) {
      document.getElementById("message").textContent = result.message;
    }

    if (result.success) {
      window.localStorage.setItem("username", result.username)
      window.location.href = "home.html";
    }
  });
}

//register
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;

    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: username, password: password })
    });

    const result = await response.json();

    if (result.message) {
      document.getElementById("message").textContent = result.message;
    }

    if (result.success) {
      window.localStorage.setItem("username", result.username)
      window.location.href = "login.html";
    }
  });
}