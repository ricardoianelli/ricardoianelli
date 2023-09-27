window.onload = function() {
    var token = sessionStorage.getItem('token');
    console.log("token: " + token);

    LoadLoggedOutPage();
};

function LoadLoggedOutPage() {
    let usernameField = document.getElementById('username-input');
    let passwordField = document.getElementById('password-input');

    HideElement("top-panel-logged-in");
    HideElement("logged-in-main-content");

    ShowElement("top-panel-logged-out");
    ShowElement("logged-out-main-content");

    document.getElementById('login-button').onclick = function() {
        let user = usernameField.value;
        Login(user, passwordField.value);
    };
};

function LoadLoggedInPage() {
    let loggedInUser = sessionStorage.getItem('user');
    let token = sessionStorage.getItem('token');

    UpdateUserWelcomeText(loggedInUser);

    HideElement("top-panel-logged-out");
    HideElement("logged-out-main-content");

    ShowElement("top-panel-logged-in");
    ShowElement("logged-in-main-content");

    document.getElementById('logout-button').onclick = function() {
        console.log("Logging out user " + loggedInUser);
        SaveUser(null);
        SaveToken(null);
        LoadLoggedOutPage();
    };
};

function HideElement(id) {
    document.getElementById(id).style.visibility = 'hidden';
};

function ShowElement(id) {
    document.getElementById(id).style.visibility = 'visible';
};

function SaveUser(user) {
    sessionStorage.setItem('user', user);
};

function SaveToken(token) {
    sessionStorage.setItem('token', token);
};

function UpdateUserWelcomeText(user) {
    document.getElementById("login-welcome-text").innerHTML = user;
};

async function Login(username, password) {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    const data = await response.json();

    if(data.error) { // Login failed
        console.log("error: " + data.error);
        document.getElementById('errorLabel').innerHTML = data.error;
    } 
    else { // Login succeeded
        document.getElementById('errorLabel').innerHTML = "";
        console.log("Trying to log in with user " + username + " and password " + password);
        SaveUser(data.username);
        SaveToken(data.username);
        LoadLoggedInPage();
    };
};

async function LoadProducts() {
    const response = await fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });

    const data = await response.json();
    console.log(data);

    if(data.error) {
        console.log("error: " + data.error);
        document.getElementById('product-list-error').innerHTML = data.error;
    } 
    else {
        let productsTable = document.getElementById('product-list-table');
        PopulateProducts(data);
    };
};

function PopulateProducts(data) {
    
};


