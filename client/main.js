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

    LoadProducts();
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
    const tableBody = document.querySelector('#product-list-table tbody');
        
    data.forEach(product => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = product.price;
        row.appendChild(priceCell);

        const imageCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.width = 50;
        imageCell.appendChild(img);
        row.appendChild(imageCell);

        const stockCell = document.createElement('td');
        stockCell.textContent = product.stock;
        row.appendChild(stockCell);

        const actionCell = document.createElement('td');
        const cartButton = document.createElement('button');
        const cartImage = document.createElement('img');
        cartImage.src = 'https://cdn-icons-png.flaticon.com/512/263/263142.png';
        cartImage.alt = 'Add to Cart';
        cartImage.width = 25;
        cartButton.appendChild(cartImage);
        cartButton.addEventListener('click', function() {
            addToCart(product);
        });

        actionCell.appendChild(cartButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
};

async function addToCart(product) {
    let currentUser = sessionStorage.getItem('user');
    
    const response = await fetch('http://localhost:3000/shopping-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: currentUser, name: product.name})
    });

    const data = await response.json();

    if(data.error) {
        console.log("error: " + data.error);
        document.getElementById('errorLabel').innerHTML = data.error;
    } 
    else {
        RefreshShoppingCart();
    };
};

function RefreshShoppingCart() {
    console.log("Refreshing shopping cart...");
}


