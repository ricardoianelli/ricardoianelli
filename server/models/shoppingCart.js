let shoppingCarts = [];

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
            return this;
        } else {
            throw new Error('NOT Found');
        }
    }

    static fetchAll() {
        return shoppingCarts;
    }

    static findByUser(user) {
        const index = shoppingCarts.findIndex(p => p.user === user);
        if (index > -1) {
            return shoppingCarts[index];
        } else {
            throw new Error('NOT Found');
        }
    }

    static deleteByUser(user) {
        const index = shoppingCarts.findIndex(p => p.user === user);
        if (index > -1) {
            shoppingCarts = shoppingCarts.filter(p => p.user !== user);
        } else {
            throw new Error('NOT Found');
        }
    }

}