import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import NavSection from "../components/NavSection";
import { getProducts } from "../api/api";
import toast from "react-hot-toast";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock products for demo
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("error fetching products", error);
        toast.error("Failed to load Products ");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="bg-green-100">
      <NavSection />
      <h1 className="text-2xl font-semibold mb-8 mt-2">Products</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
};
export default ProductPage;
