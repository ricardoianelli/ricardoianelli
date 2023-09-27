let shoppingCarts = [];

const ShoppingCartLine = require("./shoppingCartLine");

module.exports = class ShoppingCart {

    constructor(user) {
        this.user = user;
        this.cartLines = [];
    }

    save() {
        shoppingCarts.push(this);
        return this;
    }

    update() {
        const index = shoppingCarts.findIndex(p => p.user === this.user);
        if (index > -1) {
            shoppingCarts.splice(index, 1, this);
        } else {
            this.save();
        };
        return this;
    }

    static fetchAll() {
        return shoppingCarts;
    }

    static findByUser(user) {
        const index = shoppingCarts.findIndex(p => p.user === user);
        if (index > -1) {
            return shoppingCarts[index];
        } else {
            throw new Error('No shopping cart found for this user.');
        };
    }

    static deleteByUser(user) {
        const index = shoppingCarts.findIndex(p => p.user === user);
        if (index > -1) {
            shoppingCarts = shoppingCarts.filter(p => p.user !== user);
        } else {
            throw new Error('No shopping cart found for this user.');
        };
    };

    static fromJson(jsonData) {
        let newCart = new ShoppingCart(jsonData.user);
        jsonData.cartLines.forEach(cartLine => {
            newCart.cartLines.push(new ShoppingCartLine(cartLine.productName, cartLine.productPrice, cartLine.quantity));
        });

        return newCart;
    };
};