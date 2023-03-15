import ProductsService from "../services/products.service.js"


const productService = new ProductsService()

class ProductsController {
    getAllProducts = async (query, options) => {
      try {
        if (query) {
          const products = await productService.paginate(
            { status: true },
            options
          );
          5;
  
          return products;
        }
  
    
        const products = await productService.paginate({}, options);
  
        return products;
      } catch (error) {
        console.log(error);
      }
    };
  
    getProductById = async (pid) => {
      try {
        const product = await productService.findById({ _id: pid }).lean();
  
        if (!product) {
          throw new Error("Product Not Found");
        }
  
        return product;
      } catch (error) {
        console.log(error);
      }
    };
  
    addNewProduct = async (newProduct) => {
      try {
        const product = await productService.findOne({ code: newProduct.code });
  
        if (product) {
          throw new Error('Product Not Found');
        }
  
        const addProduct = await productService.create(newProduct);
  
        return addProduct;
      } catch (error) {
        console.log(error);
      }
    };
  
    updateProduct = async (pid, newProduct) => {
      try {
        const product = await this.getProductById(pid);
  
        if (!product) {
          throw new Error('Product Not Found');
        }
  
        const updateProduct = await productService.updateOne(
          { _id: pid },
          newProduct
        );
  
        return updateProduct;
      } catch (error) {
        console.log(error);
      }
    };
  
  }
  export default ProductsController