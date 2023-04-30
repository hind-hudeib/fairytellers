const form = document.getElementById("form");
const emailPassError = document.getElementById("emailPassError");

let users = [];
let valid = false;

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  let username;

  users.forEach((user) => {
    if (user.email === email && user.password === password) {
      username = user.name;
      valid = true;
    }
  });

  if (!valid) {
    emailPassError.style.display = "block";
  } else {
    sessionStorage.setItem("loggedInUser", JSON.stringify({ name: username, email }));
    window.location.href = "/src/html/registerPage.html";
  }

  form.reset();
});