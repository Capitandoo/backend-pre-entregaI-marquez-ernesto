import { Router } from "express";
import CartManager from "../manager/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.getCarts ();
      res.send(cart);
  } catch (error) {
    res.status(500).send("Error Interno");o
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById ();
    const productCart = cart.find((product) => product.id === parseInt(cartId));
    if (productCart) {
      res.send(cart);
    } else {
      res.status(404).send("Carrito no Encontrado");
    }
  } catch (error) {
    res.status(500).send("Error Interno");
  }
});

router.post("/:cid/product/:idProd", async (req, res) => {
  try {
    const { pid } = req.params;
    const { cid } = req.params;
    const cart = await cartManager.getCarts({ cid });
    const productIndex = cart.product.findIndex(
      (product) => product.id === { pid }
    );
    if (productIndex === -1) {
      cart.products.push({ id: { pid }, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }
    await saveProductToCart(cid, pid);
    res.json(cart);
  } catch (error) {
    console.log (error);
    res.status (500).json ({error: "Error al agregar el producto al carrito"});
  }
});

export default router;
