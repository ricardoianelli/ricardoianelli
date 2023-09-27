products = [
    {
        "name": "Node.JS",
        "price": 9.99,
        "image": "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
        "stock": 7
    },
    {
        "name": "React",
        "price": 19.99,
        "image": "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
        "stock": 5
    },
    {
        "name": "Angular",
        "price": 29.99,
        "image": "https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg",
        "stock": 3
    }
];

module.exports = class Product {
    constructor(name, price, image, stock) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.stock = stock;
    };

    ChangeQuantity(quantity) {
        prod = products.find(p => p.name == this.name);
        if (prod.stock + quantity < 0) {
            throw new Error("Cannot decrease stock bellow zero.");
        };

        prod.stock += quantity;
    };

    Add(quantity) {
        this.ChangeQuantity(quantity);
    };

    Remove(quantity) {
        this.ChangeQuantity(-quantity);
    };

    save() {
        products.push(this);
        return this;
    }

    update() {
        const index = products.findIndex(p => p.name === this.name);
        if (index > -1) {
            products.splice(index, 1, this);
            return this;
        } else {
            throw new Error('NOT Found');
        }
    }

    static fetchAll() {
        return products;
    };

    static findByName(name) {
        const index = products.findIndex(p => p.name === name);
        if (index > -1) {
            return products[index];
        } else {
            return null;
        }
    };

    static deleteByName(name) {
        const index = products.findIndex(p => p.name === name);
        if (index > -1) {
            products = products.filter(p => p.name !== name);
        } else {
            throw new Error('NOT Found');
        }
    };
};