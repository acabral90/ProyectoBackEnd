import { Router } from "express";
import CartsManager from "../manager/cartsManager.js";

const router = Router();

const manager = new CartsManager();

router.post('/', async (req, res)=>{

    let newCart = await manager.addCarts()

    res.send({
        status: 'success',
        newCart
    })

})

router.get('/:cid', async (req, res)=>{

    const cid = req.params.cid

    let cart = await manager.getCartsById(cid)

    res.send({
        status : 'success',
        cart
    })
})

router.post('/:cid/products/:pid', async (req, res)=>{

    const cid = req.params.cid
    const pid = req.params.pid

    let cart = await manager.addProduct(cid, pid)

    res.send({
        status: 'success',
        cart
    })
})

export default router