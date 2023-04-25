import express from 'express';
import fs from 'fs/promises';
import ProductManager from './componentes/ProductManager.js';

const app = express();
const productos = new ProductManager ();
const port = 8080;

app.listen(port, () => {
  console.log('Server iniciado en el puerto 8080');
});

async function readProducts() {
  const productsData = await fs.readFile('./productos.json');
  return JSON.parse(productsData);
}

app.get('/productos', async (req, res) => {
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

app.get('/productos/:id', async (req, res) => {
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


