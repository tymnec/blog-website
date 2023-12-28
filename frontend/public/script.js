// Show Alert
function showAlert() {
  alert("Post Published Successfully");
}

function showAlertRegistered() {
  alert("User Registered Successfully");
}

function showAlertLogin() {
  alert("Login Successful");
}

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// on click on login button hide sign up form and display only login form vice versa
function showLogin() {
  loginForm.style.display = "flex";

  //   Styling Login Form
  loginForm.style.gap = "10px";

  signupForm.style.display = "none";
}

function showSignup() {
  loginForm.style.display = "none";
  signupForm.style.display = "flex";

  //   Styling Sign Up Form
  signupForm.style.gap = "10px";
}

// View uploaded image in the canvas
const imageInput = document.getElementById("image");
const imageCanvas = document.getElementById("imageCanvas");

imageInput.addEventListener("change", () => {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      imageCanvas.width = img.width;
      imageCanvas.height = img.height;
      imageCanvas.getContext("2d").drawImage(img, 0, 0);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(imageInput.files[0]);
});

// Style the image canvas
imageCanvas.style.border = "2px dotted #ccc";
imageCanvas.style.maxWidth = "600px";
imageCanvas.style.borderRadius = "5px";

