const form = document.getElementById("form");
let positionError = document.getElementById("positionError");
let emailpassError = document.getElementById("emailPassError");

let users = [];
let valid = false;
let emailExists = false;
let passwordExists = false;


if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;
  let username;

  users.forEach((element) => {
    if (element.email == email && element.password == password) {
      username = element.name;
      valid = true;
    } else if (element.email == email && element.password != password) {
      emailExists = true;
    }
    console.log(email, element.email, password, element.password);
    console.log(valid);
  });
 
  if (valid && emailExists) {
    window.location.href = "/src/html/registerPage.html";
  }
  else if (!valid && emailExists) {
    emailpassError.style.display = "block";
  }
  form.reset();
});
