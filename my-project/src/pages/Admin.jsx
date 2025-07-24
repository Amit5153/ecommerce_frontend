import { useEffect, useState } from "react";
import api from "../api";

const Admin = () => {
  const [form, setForm] = useState({ name: "", price: "" });
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    api.get("/products").then((res) => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/products", form);
    setForm({ name: "", price: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-1/2"
          required
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded w-1/4"
          required
        />
        <button className="bg-green-600 text-white px-4 rounded hover:bg-green-700">Add</button>
      </form>

      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p._id} className="flex justify-between items-center border-b pb-1">
            <span>{p.name} - ₹{p.price}</span>
            <button
              onClick={() => handleDelete(p._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
