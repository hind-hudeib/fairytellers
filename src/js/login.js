const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

let users = [];

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;
  let valid = false;

  users.forEach((user) => {
    if (user.email === email && user.password === password) {
      valid = true;
      sessionStorage.setItem("loggedInUser", JSON.stringify(usersInfo));
      window.location.href = "/src/html/registerPage.html";
    }
  });

  if (!valid) {
    alert("Invalid email or password");
  }

  form.reset();
});
