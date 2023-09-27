products = [];

module.exports = class Product {
    constructor(name, price, image, stock) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.stock = stock;

        if (!FindByName(name)) {
            products.push()
        }
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

    FindByName(name) {
        return products.find(p => p.name == this.name);
    }

};