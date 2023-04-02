import fs from 'fs';

const path = './src/products/products.json';
        

export default class ProductManager {

    getProducts = async () =>{
        if(fs.existsSync(path)){
        const data = await fs.promises.readFile(path, 'utf-8')
        const products = JSON.parse(data);
        return products;
        }else{
            return [];
        }
    }

    getProductById = async (productId) =>{

        const products = await this.getProducts();
        
        let filterProduct = products.filter(product => product.id == productId)

        return filterProduct

    }

}

   