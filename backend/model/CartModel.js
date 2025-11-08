import mongoose from "mongoose";

const CartModel = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 1
    }
})
const cartSchema = new mongoose.Schema({
    items: [CartModel],
    total: {
        type: Number,
        default: 0,
    }
})
const Cart = mongoose.model('Cart', cartSchema)
export default Cart;