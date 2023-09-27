let shoppingCarts = [];

const ShoppingCartLine = require("./shoppingCartLine");
const Products = require("./product");

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

        let stockProduct = Products.findByName(productName);
        if (stockProduct == null || stockProduct.stock <= 0) {
            throw new Error("Product not available on stock!");
        }

        let product = this.getProduct(productName);
        if (product == null) {
            let newProduct = new ShoppingCartLine(productName, productPrice, 1);
            this.cartLines.push(newProduct);
            this.calculateTotal();
            return;
        }

        if (stockProduct.stock < product.quantity+1) {
            throw new Error("Not enough product on stock to add more to the cart.");
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

    //Testing a different way, change to the pattern I used in the others later
    placeOrder = function() {
        let orderDesc = this.generateOrderDesc();
        console.log(orderDesc);
        this.cartLines.forEach(line => {
            let prod = Products.findByName(line.productName);
            
            if (prod == null) {
                throw new Error("Could not find product named " + line.productName);
            }

            //TODO: Improve this decision making
            if (prod.stock < line.quantity) {
                throw new Error("Not enough of the product.");
            }

            prod.remove(line.quantity);
        });

        this.cartLines = [];
        this.total = 0;
        
        return orderDesc;
    };

    generateOrderDesc() {
        return "Order placed for user " + this.user + ": " + "Total: " + this.total;
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