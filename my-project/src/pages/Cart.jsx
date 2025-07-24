import { useEffect, useState } from "react";
import api from "../api";

const Cart = () => {
  const [items, setItems] = useState([]);

  const loadCart = () => {
    api.get("/cart")
      .then((res) => setItems(res.data))
      .catch(() => alert("Failed to load cart"));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = (id) => {
    api.delete(`/cart/${id}`).then(loadCart);
  };

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map(({ _id, product, quantity }) => (
            <div key={_id} className="flex justify-between items-center border-b pb-2">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p>Qty: {quantity}</p>
              </div>
              <div className="flex items-center gap-4">
                <p>₹{product.price * quantity}</p>
                <button
                  onClick={() => handleRemove(_id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <p className="text-lg font-bold">Total: ₹{total}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
