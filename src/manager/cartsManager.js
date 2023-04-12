import fs from 'fs';

const path = './src/cart/cart.json';

export default class CartsManager {

    getCarts = async () =>{
        if(fs.existsSync(path)){
        const data = await fs.promises.readFile(path, 'utf-8')
        const carts = JSON.parse(data);
        return carts;
        }else{
            return [];
        }
    }

    getCartsById = async (cid) =>{
        if(fs.existsSync(path)){
        const data = await fs.promises.readFile(path, 'utf-8')
        const carts = JSON.parse(data);
        const cart = carts.find(cart => cart.id == cid)
        return cart
        }else{
            return [];
        }
    }

    addCarts = async () =>{
        
        const carts = await this.getCarts();
        let cart = {};

        if(carts.length === 0){
            cart.id = 1
        }else{
            cart.id = carts[carts.length-1].id+1
        };

        cart.products = [];
        carts.push(cart);
        
        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
        return carts

    }

    addProduct = async (cid, pid) =>{

        const id = parseInt(pid)

        const carts = await this.getCarts();

        const cart = await this.getCartsById(cid);

        let arrayProducts = cart.products

        let product = arrayProducts.find(product => product.product == pid)
        console.log(product)

        if(product){
            product.quantity =+1
        }else{
            const newProduct = {
                product : id,
                quantity : 1
            };
            arrayProducts.push(newProduct)
        }
        console.log(arrayProducts)
        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
        return cart

    }

}