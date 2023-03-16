import config from "./services/config/config.js";

import mongoose, { mongo } from 'mongoose'

export let Cart
export let Message
export let Product
export let User

switch (config.persistence) {
    case 'FILE':
        console.log('using files...');

        const { default: ProductFile } = await import('./file/products.file.js')
        const { default: UserFile } = await import('./file/user.file.js')
        const { default: CartFile } = await import('./file/cart.file.js')

        Product = ProductFile
        User = UserFile
        Cart = CartFile

        break
    default: //case 'MONGO':
        console.log('connecting mongoose');

        mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "baseCRUD",

        }, () => console.log('Mongoose connected'))

        const { default: ProductModel} = await import('./models/products.model.js')
        const { default: UserModel } = await import('./models/user.model.js')
        const { default: CartModel } = await import('./models/cart.model.js')

        Product = ProductModel
        User = UserModel
        Cart = CartModel

        break
}