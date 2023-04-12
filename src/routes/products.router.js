import { Router } from "express";
import ProductManager from "../manager/productManager.js";

const router = Router();

const manager = new ProductManager();

router.get('/', async (req, res)=>{

    let products = await manager.getProducts();

    let limit = req.query.limit

    if(!limit) return res.send({products})

    let limitproducts = products.slice(0, limit)

    return res.send({limitproducts})
})

router.get('/:pid', async (req, res)=>{

    const pid = req.params.pid;
    
    let productoFiltrado = await manager.getProductById(pid)

    return res.send({
        productoFiltrado
    })
})

router.post('/', async (req, res)=>{
    
    const product = req.body;

    let addItem = await manager.addProducts(product)
    
    res.send({
        status: 'success',
        addItem
    })
})

router.put('/:pid', async (req, res)=>{

    const product = req.body;

    const pid = req.params.pid;

    let productoActualizado = await manager.updateProduct(product, pid)

    res.send({
        status: 'success',
        productoActualizado
    })

})

router.delete('/:pid', async (req, res)=>{

    const pid = req.params.pid;

    let productoEliminado = await manager.deleteProduct(pid)

    res.send({
        status: 'success',
        productoEliminado
    })

})

export default router;