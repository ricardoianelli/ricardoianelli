
module.exports = class ShoppingCartLine {

    constructor(product) {
        this.product = product;
        this.quantity = quantity;
        UpdateTotal();
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
        this.total = this.product.price * this.quantity;
    };
}