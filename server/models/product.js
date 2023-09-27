module.exports = class Product {
    
    static products = [
        new Product("Node.JS", 9.99, "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png", 7),
        new Product("React", 19.99, "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png", 5),
        new Product("Angular", 29.99, "https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg", 3),
    ];

    constructor(name, price, image, stock) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.stock = stock;
    };

    changeQuantity(quantity) {
    prod = Product.products.find(p => p.name == this.name);
        if (prod.stock + quantity < 0) {
            throw new Error("Cannot decrease stock bellow zero.");
        };

        prod.stock += quantity;
    };

    add(quantity) {
        this.changeQuantity(quantity);
    };

    remove(quantity) {
        this.changeQuantity(-quantity);
    };

    save() {
        Product.products.push(this);
        return this;
    }

    update() {
        const index = Product.products.findIndex(p => p.name === this.name);
        if (index > -1) {
            Product.products.splice(index, 1, this);
            return this;
        } else {
            throw new Error('NOT Found');
        }
    }

    static fetchAll() {
        return Product.products;
    };

    static findByName(name) {
        const index = Product.products.findIndex(p => p.name === name);
        if (index > -1) {
            return Product.products[index];
        } else {
            return null;
        }
    };

    static deleteByName(name) {
        const index = Product.products.findIndex(p => p.name === name);
        if (index > -1) {
            Product.products = Product.products.filter(p => p.name !== name);
        } else {
            throw new Error('NOT Found');
        }
    };

    static getQuantityByName(name) {
        let prod = this.findByName(name);
        return prod.quantity;
    }
};