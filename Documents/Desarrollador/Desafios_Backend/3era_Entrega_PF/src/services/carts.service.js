import cartModel from '../models/cart.model.js';

class CartService {
    createCart = async () => {
      try {
        const newCart = {
          cart: [],
        };
        const cart = await cartModel.create(newCart);
  
        return cart;
      } catch (error) {
        console.log(error);
      }
    };
  
    getAllCarts = async () => {
      try {
        const carts = await cartModel.find();
  
        return carts;
      } catch (error) {
        console.log(error);
      }
    };
  
    getCartById = async (cid) => {
      try {
        const cart = await cartModel
          .findById({ _id: cid })
          .populate("carts.product")
          .lean();
  
        if (!cart) throw new Error("Cart Not Found");
  
        return cart;
      } catch (error) {
        console.log(error);
      }
    }}
    export default CartService 