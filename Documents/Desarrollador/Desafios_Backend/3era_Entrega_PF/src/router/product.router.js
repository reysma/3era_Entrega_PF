import { Router } from 'express'
import mongoose from 'mongoose'
import ProductsController from '../models/products.controller.js'




const router = Router()
const productController =new ProductsController

router.get('/', async (req, res) => {


    try {
        const { sort, query, page, limit } = req.query;
        const options = {
          limit: limit || 5,
          page: page || 1,
          sort: { price: sort } || { price: 1 },
          lean: true,
        };
        
        const products = await productController.find().lean().exec()
        
        res.render('index', {
            products
        })
        if (!products) {
            return res.send({
                succes: false,
            })
        }


    } catch (error) {
        console.log("usuario sin conexion mongo", error)
    }

})
//Muestra un solo producto
router.get('/', async (req, res) => {


    try {
        const title = req.params.title

        const product = await productController.findOne({ title: title }).lean().exec()

        res.render('one', { product })

        if (!product) {
            return res.send({
                succes: false,
            })
        }

    } catch (error) {
        console.log("usuario sin conexion mongo", error)
    }

})
//delete products
router.get('/delete/:id', async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const deleted = await productController.deleteOne({ _id: id })

    console.log(deleted)

    res.redirect('/products')
})


// vista para crear products
router.get('/create', async (req, res) => {
    res.render('create', {})
})

router.post('/create', async (req, res) => {

    try {
        const newProduct = req.body;

        if (!newProduct) {
            return res.send({
                succes: false,
            })
        }

        const result = await productController.create(newProduct);

        res.send({
            succes: true,
            status: result,
            payload: newProduct,
        })
    }
    catch (error) {
        console.log("enviando sin conexion mongo", error);
    }

})


export default router 