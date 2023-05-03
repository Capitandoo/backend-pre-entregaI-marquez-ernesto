import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import { __dirname } from './path.js';
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();
const port = 8080;

app.use (express.json ());
app.use (express.urlencoded ({extended:true}));
app.use (express.static (__dirname + '/public'));
app.use(errorHandler);

app.use ('/products', productsRouter);
app.use ('/cart', cartRouter);

app.listen(port, () => {
  console.log(`Server iniciado en el puerto ${port}`);
});


