import CartService from "../services/carts.service.js"



class CartController {

    constructor() {
        this.cartService = new CartService()
    }

    getAll = () => {
        return this.cartService.getAll()
    }

    create = data => {
        return this.cartService.create(data)
    }   

}

export default CartController