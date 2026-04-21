// ================= REGISTER VALIDATION =================
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

fname.addEventListener("input", validateFname);
lname.addEventListener("input", validateLname);
username.addEventListener("input", validateUsername);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);

function validateFname() {
    const error = document.getElementById("fnameError");
    if (fname.value.length < 2) {
        error.innerText = "Enter valid first name";
        fname.classList.add("invalid");
    } else {
        error.innerText = "";
        fname.classList.remove("invalid");
    }
}

function validateLname() {
    const error = document.getElementById("lnameError");
    if (lname.value.length < 2) {
        error.innerText = "Enter valid last name";
        lname.classList.add("invalid");
    } else {
        error.innerText = "";
        lname.classList.remove("invalid");
    }
}

function validateUsername() {
    const error = document.getElementById("usernameError");
    if (username.value.length < 5 || username.value.length > 20) {
        error.innerText = "Username must be 5–20 characters";
        username.classList.add("invalid");
    } else {
        error.innerText = "";
        username.classList.remove("invalid");
    }
}

function validateEmail() {
    const error = document.getElementById("emailError");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value)) {
        error.innerText = "Invalid email";
        email.classList.add("invalid");
    } else {
        error.innerText = "";
        email.classList.remove("invalid");
    }
}

function validatePassword() {
    const error = document.getElementById("passwordError");
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{5,20}$/;
    if (!regex.test(password.value)) {
        error.innerText = "Weak password";
        password.classList.add("invalid");
    } else {
        error.innerText = "";
        password.classList.remove("invalid");
    }
    validateConfirmPassword();
}

function validateConfirmPassword() {
    const error = document.getElementById("confirmPasswordError");
    if (confirmPassword.value !== password.value) {
        error.innerText = "Passwords do not match";
        confirmPassword.classList.add("invalid");
    } else {
        error.innerText = "";
        confirmPassword.classList.remove("invalid");
    }
}

function validateForm() {
    validateFname();
    validateLname();
    validateUsername();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (
        document.querySelectorAll(".invalid").length > 0
    ) {
        alert("Fix errors before registering");
        return;
    }

    alert("Registration successful!");
}

// ================= LOGIN VALIDATION =================
function validateLogin() {
    const user = document.getElementById("loginUsername");
    const pass = document.getElementById("loginPassword");
    const error = document.getElementById("loginError");

    if (user.value === "" || pass.value === "") {
        error.innerText = "All fields required";
        return;
    }

    error.innerText = "";
    alert("Login successful!");
}

// ================= CART FUNCTIONALITY =================
let cart = [];

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    renderCart();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    renderCart();
}

function renderCart() {
    const cartDiv = document.getElementById("cartItems");
    const totalSpan = document.getElementById("total");

    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        cartDiv.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (x${item.qty})</span>
                <span>₹${item.price * item.qty}</span>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
    });

    totalSpan.innerText = total;
}