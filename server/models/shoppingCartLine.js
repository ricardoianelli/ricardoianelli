module.exports = class ShoppingCartLine {

    constructor(productName, productPrice, quantity) {
        this.productName = productName; 
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.total = productPrice * quantity;
    };

    ChangeQuantity(quantity) {
        this.quantity = quantity;
        UpdateTotal();
    };

    Add(quantity) {
        this.ChangeQuantity(quantity);
    };

    Remove(quantity) {
        this.ChangeQuantity(-quantity);
    };

    UpdateTotal() {
        this.total = this.productPrice * this.quantity;
    };
}