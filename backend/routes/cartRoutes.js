import express from 'express';
import { addItems, checkoutCart, deleteItems, getCart, updateQty } from '../controllers/cartController.js';

const cartRoutes = express.Router()
cartRoutes.get('/', getCart)
cartRoutes.post('/', addItems, (req, res) => {
    // console.log(" Cart add route hit:", req.body)
    res.send("OK")
})
cartRoutes.delete('/:id', deleteItems)
cartRoutes.post('/checkout', checkoutCart)
cartRoutes.put("/update", updateQty);

export default cartRoutes;