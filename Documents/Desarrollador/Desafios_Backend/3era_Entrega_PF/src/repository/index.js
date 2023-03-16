import  { Product, Cart, User } from '../factory.js'

import ProductRepository from '../repository/products.repository.js'
import CartRepository from '../repository/cart.repository.js'
import UserRepository from '../repository/users.repository.js'


export const ProductService = new ProductRepository(new Product())
export const CartService = new CartRepository(new Cart())
export const UserService = new UserRepository(new User())
