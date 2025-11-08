import express from 'express'
import { getProducts } from '../controllers/productController.js';

const productRoute = express.Router();
productRoute.get('/', getProducts)
export default productRoute;