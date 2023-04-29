import fs from 'fs';

export default class CartManager {
  constructor() {
    this.path = '../data/carrito.json'
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
        const newProduct = { id: id + 1, ...product, };
        if (products.some (p => p.code == product.code)) {
            return console.log ("El codigo debe ser unico");
        }
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

  async saveProductToCart (idCart, idProd) {
    try {
      const cart = await this.getCartById (idCart);
      if (cart) {
        const prodExiste = cart.products.find (p => p.id === idProd);
        if (prodExiste){
          prodExiste.quantity +1;
        } else {
          cart.products.push (idProd);
        }
      } else {
        console.log (error);
      }
    } catch (error) {
      console.log(error);
    }
  };
}
