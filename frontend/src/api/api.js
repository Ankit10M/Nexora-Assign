import axios from 'axios'
export const BASE_URL = 'http://localhost:5000/api';
const axiosInstances = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})
export const getProducts = () => axiosInstances.get('/products')
export const getCart = () => axiosInstances.get("/cart");
export const addToCart = (item) => axiosInstances.post("/cart", item);
export const removeFromCart = (itemId) => axiosInstances.delete(`/cart/${itemId}`);
export const checkoutCart = () => axiosInstances.post("/cart/checkout");
export const updateQtyAPI = (data) =>
    axiosInstances.put("/cart/update", data);

export default axiosInstances;