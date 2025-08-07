import React, { useEffect, useState } from "react";
import productsData from "../data/products.json";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <section className="grid md:grid-cols-3 gap-6 p-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded-xl shadow-md p-4 hover:scale-105 transition"
        >
          <img src={p.image} alt={p.title} className="w-full rounded-lg" />
          <h3 className="text-lg font-bold mt-2">{p.title}</h3>
          <p className="text-green-700 font-semibold">₹{p.price}</p>
          <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
            Add to Cart
          </button>
        </div>
      ))}
    </section>
  );
}
