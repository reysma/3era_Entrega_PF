import { ProductModel } from "../models/product.model.js";


class ProductService {

    constructor() {
        this.productModel = new ProductModel()
    }

    getAll = () => {
        return this.productModel.getAll()
    }

    create = data => {
        return this.productModel.create(data)
    }   

}



export default ProductService