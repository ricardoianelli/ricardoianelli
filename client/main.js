var DEFAULT_DECIMAL_PLACES = 2;

//TODO: Move code to modules, class is getting too big

window.onload = async function() {
    var token = sessionStorage.getItem('token');
    if (token == null || token == "null") {
        await LoadLoggedOutPage();
    }
    else {
        await LoadLoggedInPage();
    }
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

async function LoadLoggedInPage() {
    let loggedInUser = sessionStorage.getItem('user');
    let token = sessionStorage.getItem('token');

    UpdateUserWelcomeText(loggedInUser);

    HideElement("top-panel-logged-out");
    HideElement("logged-out-main-content");

    ShowElement("top-panel-logged-in");
    ShowElement("logged-in-main-content");

    document.getElementById('place-order-button').onclick = function() {
        PlaceOrder();
    };

    document.getElementById('logout-button').onclick = function() {
        SaveUser(null);
        SaveToken(null);
        LoadLoggedOutPage();
    };

    await LoadProducts();
    await RefreshShoppingCart();
};

function HideElement(id) {
    document.getElementById(id).style.display = 'none';
};

function ShowElement(id) {
    document.getElementById(id).style.display = 'flex';
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

async function PlaceOrder() {
    let currentUser = sessionStorage.getItem('user');

    const response = await fetch('http://localhost:3000/cart/place/' + currentUser, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'auth': sessionStorage.getItem('token')
        }
    });

    const data = await response.json();

    if(data.error) {
        if (response.status == 401) {
            return LoadLoggedOutPage();
        }
        console.log("error: " + data.error);
        alert(data.error);
    } 
    else {
        await LoadProducts();
        await RefreshShoppingCart();
    };
}

async function Login(username, password) {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-type': 'application/json',
                'auth': sessionStorage.getItem('token')
            }
        });

        const data = await response.json();

        if (response.status < 200 || response.status > 300) {
            if (data.error) {
                throw new Error(data.error);  
            }
            else {
                throw new Error(JSON.stringify(data));
            }
        }

        SaveUser(data.username);
        SaveToken(data.token);
        LoadLoggedInPage();

    } catch (error) {
        console.log(error.message);
        alert(error.message);     
    }
};

async function LoadProducts() {
    const response = await fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'auth': sessionStorage.getItem('token')
        }
    });

    const data = await response.json();

    if(data.error) {
        if (response.status == 401) {
            return LoadLoggedOutPage();
        }
        console.log("error: " + data.error);
        alert(data.error);
    } 
    else {
        let productsTable = document.getElementById('product-list-table');
        PopulateProducts(data);
    };
};

function PopulateProducts(data) {
    const tableBody = document.querySelector('#product-list-table tbody');

    //Cleanup table before populating again.
    if (tableBody) {
        tableBody.innerHTML = "";
    }
        
    data.forEach(product => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = product.price.toFixed(DEFAULT_DECIMAL_PLACES);
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
    
    const response = await fetch('http://localhost:3000/cart/' + currentUser, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'auth': sessionStorage.getItem('token')
        },
        body: JSON.stringify({productName: product.name, productPrice: product.price})
    });

    const data = await response.json();

    if(data.error) {
        if (response.status == 401) {
            return LoadLoggedOutPage();
        }
        console.log("error: " + data.error);
        alert(data.error);
    } 
    else {
        RefreshShoppingCart();
    };
};

async function removeFromCart(product) {
    let currentUser = sessionStorage.getItem('user');
    
    const response = await fetch('http://localhost:3000/cart/' + currentUser, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'auth': sessionStorage.getItem('token')
        },
        body: JSON.stringify({productName: product.name})
    });

    const data = await response.json();

    if(data.error) {
        if (response.status == 401) {
            return LoadLoggedOutPage();
        }
        console.log("error: " + data.error);
        alert(data.error);
    } 
    else {
        RefreshShoppingCart();
    };
};

async function RefreshShoppingCart() {
    let currentUser = sessionStorage.getItem('user');

    const response = await fetch('http://localhost:3000/cart/' + currentUser, {
        headers: {
            'Content-type': 'application/json',
            'auth': sessionStorage.getItem('token')
        }
    });

    const data = await response.json();

    if(data.error) {
        if (response.status == 401) {
            return LoadLoggedOutPage();
        }
        console.log("error: " + data.error);
        alert(data.error);

    } 
    else {
        let cartIsEmpty = data.cartLines.length <= 0;
        document.getElementById('shopping-cart-items-empty').style.visibility = cartIsEmpty ? "visible" : "hidden";
        document.getElementById('shopping-cart-items-not-empty').style.visibility = cartIsEmpty ? "hidden" : "visible";

        if (!cartIsEmpty) {
            PopulateCart(data);
        }
    };
};

function PopulateCart(data) {
    const tableBody = document.querySelector('#shopping-cart-table tbody');
    const cartTotal = document.querySelector('#shopping-cart-total-row');

    //Cleanup table before populating again.
    if (tableBody) {
        tableBody.innerHTML = "";
    }
        
    data.cartLines.forEach(line => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = line.productName;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = line.productPrice.toFixed(DEFAULT_DECIMAL_PLACES);
        row.appendChild(priceCell);

        const productTotal = document.createElement('td');
        productTotal.textContent = line.total.toFixed(DEFAULT_DECIMAL_PLACES);
        row.appendChild(productTotal);

        const changeQuantityCell = document.createElement('td');
        const changeQuantityDiv = document.createElement('div');
        changeQuantityDiv.className = "quantity-div";

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', function() {
            removeFromCart({name: line.productName});
        });

        changeQuantityDiv.appendChild(minusButton);

        const inputField = document.createElement('input');
        inputField.type = 'number';
        inputField.id = 'quantity-input';
        inputField.value = line.quantity;
        changeQuantityDiv.appendChild(inputField);

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', function() {
            addToCart({name: line.productName, price: line.productPrice});
        });
        changeQuantityDiv.appendChild(plusButton);

        changeQuantityCell.appendChild(changeQuantityDiv);
        row.appendChild(changeQuantityCell);

        tableBody.appendChild(row);
    });

    cartTotal.textContent = "Total: " + data.total.toFixed(DEFAULT_DECIMAL_PLACES);
};


