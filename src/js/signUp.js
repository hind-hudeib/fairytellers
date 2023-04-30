
// populate day select
let daySelect = document.getElementById("day");
for (let i = 1; i <= 31; i++) {
  let option = document.createElement("option");
  option.text = i;
  option.value = i;
  daySelect.add(option);
}

// populate month select
let monthSelect = document.getElementById("month");
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
for (let i = 0; i < months.length; i++) {
  let option = document.createElement("option");
  option.text = months[i];
  option.value = i + 1;
  monthSelect.add(option);
}
// ---------------------------------


let form = document.getElementById("form");
let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let passwordConfirmError = document.getElementById("passwordConfirmError");
let checkboxError = document.getElementById("checkboxError");

let selectedValue;
let loggedInUser;
let valid = true;
let exists = false;
let users = [];

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = e.target.username.value;
  const usernameRegex = /^\S+$/;
  if (!usernameRegex.test(name)) {
    nameError.style.display = "block";
    valid = false;
  } else {
    nameError.style.display = "none";
  }

  const password = e.target.password.value;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
    passwordError.style.display = "block";
    valid = false;
  } else {
    passwordError.style.display = "none";
  }

  const passwordConfirm = e.target["password-confirm"].value;
  if (password !== passwordConfirm) {
    passwordConfirmError.style.display = "block";
    valid = false;
  } else {
    passwordConfirmError.style.display = "none";
  }

  const email = e.target.email.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.style.display = "block";
    valid = false;
  } else {
    emailError.style.display = "none";
  }

  users.forEach((element) => {
    if (element.email === email) {
      exists = true;
    }
  });

  let checked;
  const checkbox = e.target.checkbox.checked;
  if (checkbox === true) {
    checked = "checked";
    checkboxError.style.display = "none";
  } else {
    checkboxError.style.display = "block";
    checked = "error";
    valid = false;
  }


  if (valid && !exists) {
    let usersInfo = new Object(name, password, email);
    users.push(usersInfo);
    localStorage.setItem("users", JSON.stringify(users));

    sessionStorage.setItem("loggedInUser", JSON.stringify(usersInfo));

    window.location.href = "/src/html/registerPage.html";

  } else if (valid && exists) {
    
    alert("User already exists !")
  }

  form.reset();
});

class Object {
  constructor(name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
  }
}