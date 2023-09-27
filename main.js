window.onload = function() {
    var token = sessionStorage.getItem('token');
    console.log("token: " + token);

    LoadLoggedOutPage();

    // if (token != null) {
    //     console.log("token != null");
    //     LoadLoggedInPage();
    // }
    // else {
    //     console.log("token == null");
    //     LoadLoggedOutPage();
    // }
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
        console.log("Trying to log in with user " + user + " and password " + passwordField.value);
        SaveUser(user);
        SaveToken(user + "_token");
        LoadLoggedInPage();
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
    document.getElementById("login-welcome-text").innerHTML = "Welcome, " + user;
}


