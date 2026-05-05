//login 
const loginForm =
document.getElementById("loginForm");
 if (loginForm) { loginForm.addEventListener("submit", async function(e) {
   e.preventDefault();
    const username = document.getElementById("username").value;
     const password = document.getElementById("password").value;
      const response = await fetch("/login", { method: "POST",
       headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: username, password: password }) });
        const result = await response.json(); 

        if (result.message) { document.getElementById("message").textContent = result.message; } 
        if (result.success) { 
          window.localStorage.setItem("username", result.username) 
          window.location.href = "/home"; } }); 
}

//login info and message

 const savedUsername = localStorage.getItem("username"); 
 if (savedUsername && savedUsername != "undefined" && document.getElementById("loginSection"))
   { document.getElementById("loginSection").style.display = "none";
     document.getElementById("userSection").style.display = "block"; document.getElementById("welcome").textContent = "Hello, " + savedUsername; }

//logout button '
const logoutBtn = document.getElementById("logoutBtn");
 if (logoutBtn) { logoutBtn.addEventListener("click", function() { localStorage.removeItem("username");
   window.location.href = "/login"; }); } 
   //view orders button 
const ordersBtn = document.getElementById("ordersBtn");
 if (ordersBtn) { ordersBtn.addEventListener("click", function() 
  { window.location.href = "/orders"; }); } 
  //register 
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
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
      window.localStorage.removeItem("username")
      window.localStorage.setItem("username", result.username);
    }
  });
}