import fs from 'fs';
import { pathCarritos } from '../path.js';

export default class CartManager {
  constructor() {
    this.path = pathCarritos;
  }

  async getCarts () {
    try {
        if (!fs.existsSync (this.path)){
            fs.writeFileSync (this.path, '[]');
        }
        const carts = JSON.parse (await fs.promises.readFile (this.path, 'utf8'));
        return carts;
    } catch (error) {
        console.log (error);
    }
}
  
  async addCart (product) {
    try{
        const products = await this.getCarts ();
        const id = products.length > 0 ? products[products.length - 1].id : 0;
        const newProduct = { id: id + 1, products: [], };
        products.push(newProduct);
        await fs.promises.writeFile (this.path, JSON.stringify (products));
        return newProduct;
    } catch (error) {
        console.log (error);
    }
}
  
  async getCartById(id) {
    try {
      const products = await this.getCarts();
      const data = products.find((product) => product.id === id);
      if (!data) {
        console.log(`El producto con el id ${id} no fue encontrado`);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async saveProductToCart (cid, pid) {
    try {
      const cart = await this.getCartById (cid);
      if (cart) {
        const prodExiste = cart.products.find (p => p.id === pid);
        if (prodExiste){
          prodExiste.quantity +1;
        } else {
          cart.products.push (pid);
        }
      } else {
        console.log (error);
      }
    } catch (error) {
      console.log(error);
    }
  };
}
