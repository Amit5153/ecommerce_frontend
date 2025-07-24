import { useEffect, useState } from "react";
import api from "../api";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders")
      .then((res) => setOrders(res.data))
      .catch(() => alert("Failed to fetch orders"));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border rounded p-4">
              <h3 className="font-semibold mb-2">Order ID: {order._id}</h3>
              <ul className="list-disc pl-5">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.product.name} - Qty: {item.quantity}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-semibold">Total: ₹{order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
