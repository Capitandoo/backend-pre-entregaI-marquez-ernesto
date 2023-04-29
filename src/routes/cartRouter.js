import { Router } from "express";
import CartManager from "../manager/CartManager.js";

const router = Router();
const cartManager = new CartManager();

async function readCarts() {
  const productsData = await fs.readFile('../data/carrito.json');
  return JSON.parse(productsData);
}

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await readCarts ();
    if (!limit) {
      res.send(products);
    } else {
      res.send(products.slice(0, limit));
    }
  } catch (error) {
    res.status(500).send('Error Interno');
  }
});

router.get('/:idCart', async (req, res) => {
  try {
    const id = req.params.idCart;
    const products = await readCarts();
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

router.post("/:idCart/product/:idProd", async (req, res) => {
  const { idProd } = req.params;
  const { idCart } = req.params;
  await saveProductToCart(idCart, idProd);
});

export default router;
