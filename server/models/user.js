let users = [{name:'Ricardo', username: 'ricardo', password: '123' }, { name:'Michael', username: 'michael', password: '456' }];

module.exports = class User {
    constructor(name, username, password) {
        this.name = name;
        this.username = username;
        this.password = password;
    }

    static findUser(username, password) {
        const user = users.find(u => u.username === username);
        if (user == null) {
            throw new Error("Couldn't find user!");
        }

        if (user.password == password) {
            return user;
        }

        throw new Error("Wrong password!")
    }
}