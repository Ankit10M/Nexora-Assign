import axios from 'axios'
export const BASE_URL = 'https://nexora-assign-backend.onrender.com';
const axiosInstances = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})
export const getProducts = () => axiosInstances.get('/api/products')
export const getCart = () => axiosInstances.get("/api/cart");
export const addToCart = (item) => axiosInstances.post("/api/cart", item);
export const removeFromCart = (itemId) => axiosInstances.delete(`/api/cart/${itemId}`);
export const checkoutCart = () => axiosInstances.post("/api/cart/checkout");
export const updateQtyAPI = (data) =>
    axiosInstances.put("/api/cart/update", data);

export default axiosInstances;