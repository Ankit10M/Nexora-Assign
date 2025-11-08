import Cart from "../model/CartModel.js";
import Product from "../model/ProductModel.js";

// add to cart items
export const addItems = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'product not found', success: false })
        }
        let cart = await Cart.findOne().populate('items.product')
        if (!cart) {
            cart = new Cart({ items: [], total: 0 })
        }
        const existingCart = cart.items.find((item) => item.product._id.toString() === productId)
        if (existingCart) {
            existingCart.qty += qty;
        } else {
            cart.items.push({ product, qty })
        }
        cart.total = cart.items.reduce((sum, item) => {
            const price = item.product?.price || 0;
            const qunatity = item.qty || 0;
            return sum + price * qunatity
        }, 0)
        await cart.save()
        res.json(cart)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}

// remove items
export const deleteItems = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findOne().populate('items.product')
        if (!cart) {
            return res.status(404).json({ message: 'Cart Not Found', success: false })
        }
        cart.items = cart.items.filter(item => item.product._id.toString() !== id);
        cart.total = cart.items.reduce((sum, item) => {
            const price = item.product?.price || 0;
            const qunatity = item.qty || 0;
            return sum + price * qunatity
        }, 0)
        await cart.save();
        res.json(cart)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
// getcart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('items.product')
        if (!cart) {
            return res.json({ items: [], total: 0 })
        }
        res.json(cart)
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'server error', success: false })
    }
}
// checkout cart
export const checkoutCart = async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('items.product')
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'your cart is empty' })
        }
        const total = cart.items.reduce((sum, item) => {
            const price = item.product?.price || 0;
            const quantity = item.qty || 0;
            return sum + price * quantity;
        }, 0);
        const receipt = {
            orderId: `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            total,
            items: cart.items.map((i) => ({
                name: i.product?.name,
                price: i.product?.price,
                qty: i.qty,
            })),
            timestamp: new Date().toISOString()
        }
        cart.items = []
        cart.total = 0
        await cart.save()
        res.json({ message: 'checkout done', receipt })
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: "Server error" });
    }
}
export const updateQty = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const cart = await Cart.findOne().populate('items.product');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const item = cart.items.find((i) => i.product._id.toString() === productId);
        if (item) item.qty = qty;

        cart.total = cart.items.reduce(
            (sum, i) => sum + (i.product?.price || 0) * (i.qty || 0),
            0
        );

        await cart.save();
        await cart.populate('items.product');

        res.json({ success: true, cart });
    } catch (error) {
        console.error('Update quantity error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
