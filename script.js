const registerForm = document.querySelector("#register form");
const loginForm = document.querySelector("#login form");
const articleForm = document.querySelector("#create-article form");


if (registerForm) {
    registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.querySelector("#register-name").value;
    const email = document.querySelector("#register-email").value;
    const password = document.querySelector("#register-password").value;
    const confirmPassword = document.querySelector("#confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully!");

    registerForm.reset();

        window.location.href = "login.html";
    });
}


if (loginForm) {
    loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    const savedUser = localStorage.getItem("user");

    if (savedUser === null) {
        alert("No account found. Please register first.");
        return;
    }

    const user = JSON.parse(savedUser);

    if (email === user.email && password === user.password) {

        localStorage.setItem("loggedIn", "true");

        alert("Login successful!");

        loginForm.reset();

        window.location.href = "profile.html";

    } else {

        alert("Invalid email or password.");

    }

    });
}


if (articleForm) {
    articleForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = document.querySelector("#article-title").value;
    const category = document.querySelector("#article-category").value;
    const content = document.querySelector("#article-content").value;

    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {

        alert("Please login before creating an article.");

        window.location.href = "login.html";

        return;
    }

    let articles = JSON.parse(localStorage.getItem("articles")) || [];

    const article = {
        id: Date.now(),
        title: title,
        category: category,
        content: content
    };

    articles.push(article);

    localStorage.setItem("articles", JSON.stringify(articles));

    alert("Article published successfully!");

    articleForm.reset();

    console.log("Article created:", article);

    });
}


const profileSection = document.querySelector("#profile");

const logoutButton = profileSection
    ? profileSection.querySelector("button")
    : null;

if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {

    event.preventDefault();

    localStorage.removeItem("loggedIn");

    alert("You have been logged out.");

        window.location.href = "login.html";
    });
}


function showUserProfile() {

    const savedUser = localStorage.getItem("user");

    if (savedUser === null || !profileSection) {
        return;
    }

    const user = JSON.parse(savedUser);

    const profileName = profileSection.querySelector("p:nth-of-type(1)");
    const profileEmail = profileSection.querySelector("p:nth-of-type(2)");

    profileName.innerHTML =
        "<strong>Name:</strong> " + user.name;

    profileEmail.innerHTML =
        "<strong>Email:</strong> " + user.email;
}

showUserProfile();


function checkLogin() {

    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === "true") {

        console.log("User is logged in.");

    } else {

        console.log("User is not logged in.");

    }
}

checkLogin();