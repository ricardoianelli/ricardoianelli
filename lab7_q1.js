

function askPassword(ok, fail) {
    let password = prompt("Passowrd?", "");
    if (password == "rockstar") {
        ok();
    }
    else {
        fail();
    }
}

let user = {
    name: "John",

    loginOk() {
        alert(`${this.name} logged in`);
    },

    loginFail() {
        alert(`${this.name} failed to log in`);
    },
};

// Solution 1: using bind()
//askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

// Solution 2: using arrow functions
askPassword(() => {user.loginOk()}, () => {user.loginFail()});
