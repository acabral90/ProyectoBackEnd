import express from 'express';
import ProductManager from './manager/productManager.js';

const PORT = '8080'

const app = express();

const manager = new ProductManager();

app.use(express.urlencoded({extended:true}))


app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: ' + PORT)
});

app.get('/products', async(req, res)=>{
    
    let productos = await manager.getProducts();

    res.send({
        productos
    })
})

app.get('/products/:idProduct', async (req, res)=>{

    const idProduct = req.params.idProduct;
    
    let productoFiltrado = await manager.getProductById(idProduct)

    res.send({
        productoFiltrado
    })
})