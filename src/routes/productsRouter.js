import { Router } from "express";
import fs from 'fs/promises';
import ProductManager from '../manager/ProductManager.js';

const router = Router ();
const productManager = new ProductManager ();

async function readProducts() {
    const productsData = await fs.readFile('../data/productos.json');
    return JSON.parse(productsData);
  }

router.get('/', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit);
      const products = await readProducts();
      if (!limit) {
        res.send(products);
      } else {
        res.send(products.slice(0, limit));
      }
    } catch (error) {
      res.status(500).send('Error Interno');
    }
});
  
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const products = await readProducts();
    const product = products.find((product) => product.id === parseInt (id));
    if (product) {
      res.send(product);
    } else {
      res.status(404).send('Producto no Encontrado');
    }
  } catch (error) {
    res.status(500).send('Error Interno');
  }
});

router.post('/', async (req, res)=>{
  try {
      const product = req.body;
      const newProduct = await productManager.addProduct (product);
      res.json(newProduct);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});

router.put('/:id', async(req, res) => {
  try {
      const product = req.body;
      const { id } = req.params;
      const productFile = await productManager.getProductById(Number(id));
      if(productFile){
          await productManager.updateProduct(product, Number(id));
          res.send(`Producto Actualizado!`);
      } else {
          res.status(404).send('Producto No Encontrado')
      }
  } catch (error) {
      res.status(404).json({ message: error.message });
    }
});

router.delete('/:id', async(req, res)=>{
  try {
      const { id } = req.params;
      const products = await readProducts ();
      if(products.length > 0){
          await productManager.deleteProduct(Number(id));
          res.send(`El Producto Con El id: ${id} Fue Borrado`);
      } else {
          res.send(`El Producto Con El id: ${id} No Fue Encontrado`);
      }
  } catch (error) {
      res.status(404).json({ message: error.message });
    }
});

export default router;
