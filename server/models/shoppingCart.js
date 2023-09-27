let shoppingCarts = [];

const ShoppingCartLine = require("./shoppingCartLine");

module.exports = class ShoppingCart {

    constructor(user) {
        this.user = user;
        this.cartLines = [];
        this.total = 0;
    };

    save() {
        shoppingCarts.push(this);
        return this;
    };

    update() {
        const index = shoppingCarts.findIndex(p => p.user === this.user);

        if (index > -1) {
            shoppingCarts.splice(index, 1, this);
        } else {
            this.save();
        };

        this.calculateTotal();
        return this;
    };

    calculateTotal() {
        this.total = this.cartLines.reduce((total, prod) => total + prod.total, 0);
    };

    getProduct(productName) {
        const index = this.cartLines.findIndex(p => p.productName == productName);
        if (index > -1) {
            return this.cartLines[index];
        }

        return null;
    };

    addProduct(productName, productPrice) {
        let product = this.getProduct(productName);
        if (product == null) {
            let newProduct = new ShoppingCartLine(productName, productPrice, 1);
            this.cartLines.push(newProduct);
            this.calculateTotal();
            return;
        }

        product.add(1);
        this.calculateTotal();
    };

    removeProduct(productName) {
        let product = this.getProduct(productName);
        if (product == null) {
            return;
        }

        product.remove(1);
        if (product.quantity <= 0) {
            this.cartLines = this.cartLines.filter(p => p.productName != productName);
        };
        this.calculateTotal();
    };

    static fetchAll() {
        return shoppingCarts;
    };

    static findByUser(user) {
        const index = shoppingCarts.findIndex(p => p.user === user);
        if (index == -1) {
            let newCart = new ShoppingCart(user);
            shoppingCarts.push(newCart); 
            return newCart;
        };

        return shoppingCarts[index];  
    };

    static deleteByUser(user) {
        const index = shoppingCarts.findIndex(p => p.user === user);
        if (index > -1) {
            shoppingCarts = shoppingCarts.filter(p => p.user !== user);
        } else {
            throw new Error('No shopping cart found for this user.');
        };
        this.calculateTotal();
    };

    static fromJson(jsonData) {
        let newCart = new ShoppingCart(jsonData.user);
        jsonData.cartLines.forEach(cartLine => {
            newCart.cartLines.push(new ShoppingCartLine(cartLine.productName, cartLine.productPrice, cartLine.quantity));
        });

        return newCart;
    };
};