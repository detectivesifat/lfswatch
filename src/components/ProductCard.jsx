import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-b from-[#111827] to-[#0d1117] hover:border-[#02cbf9]/30 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(2,203,249,0.12)] hover:-translate-y-1 no-underline"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        {/* Shimmer overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c10]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2">
        <h3 className="text-sm sm:text-base font-semibold text-white/85 leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <p className="text-base sm:text-lg font-black text-[#02cbf9]">
          ৳{product.price.toLocaleString()}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`mt-auto w-[90%] mx-auto mb-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer border ${
            added
              ? 'bg-green-500/10 border-green-500/40 text-green-400'
              : 'bg-white/5 border-white/10 text-white/80 hover:bg-[#02cbf9] hover:border-[#02cbf9] hover:text-[#080c10] hover:shadow-[0_4px_16px_rgba(2,203,249,0.3)]'
          }`}
        >
          {added ? (
            <>
              <Check size={16} />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </Link>
  );
}
