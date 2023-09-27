module.exports = class ShoppingCartLine {

    constructor(productName, productPrice, quantity) {
        this.productName = productName; 
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.total = productPrice * quantity;
    };

    changeQuantity(quantity) {
        this.quantity = quantity;
        this.updateTotal();
    };

    add(quantity) {
        this.changeQuantity(this.quantity + quantity);
    };

    remove(quantity) {
        this.changeQuantity(this.quantity - quantity);
    };

    updateTotal() {
        this.total = this.productPrice * this.quantity;
    };
}