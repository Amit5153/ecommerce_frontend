import api from "../api";

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    api.post("/cart", { productId: product._id, quantity: 1 })
      .then(() => alert("Added to cart"))
      .catch(() => alert("Login first"));
  };

  return (
    <div className="bg-white border rounded-lg shadow p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700 mb-2">₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
