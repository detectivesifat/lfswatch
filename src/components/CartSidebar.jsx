import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useEffect, useRef } from 'react';

export default function CartSidebar() {
  const { items, isOpen, cartTotal, closeCart, updateQuantity, removeItem } = useCart();
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 h-full z-[70] flex flex-col
          w-full sm:w-[400px] lg:w-[430px]
          bg-[#1f2937] border-l border-white/5
          shadow-[−20px_0_60px_rgba(0,0,0,0.5)]
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#02cbf9]/10 text-[#02cbf9]">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Your Cart</h2>
              <p className="text-xs text-white/30">{items.length} item{items.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            id="close-cart-btn"
            onClick={closeCart}
            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/30 gap-4">
              <div className="p-6 rounded-2xl bg-white/3 border border-white/5">
                <ShoppingBag size={48} className="opacity-40" />
              </div>
              <p className="text-base font-semibold text-white/50">Your cart is empty</p>
              <p className="text-sm text-white/25">Add some watches to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-[#02cbf9]/15 transition-all duration-200"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl shrink-0 border border-white/5 bg-white"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white/85 leading-snug line-clamp-2 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-[#02cbf9] font-black text-sm mb-3">
                      ৳{item.price.toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-sm font-black text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white/70">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/5 px-6 py-5 space-y-4 bg-[#1a202c]/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white/50">Total</span>
              <span className="text-2xl font-black text-white">
                ৳{cartTotal.toLocaleString()}
              </span>
            </div>
            <a
              id="checkout-btn"
              href="/checkout"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#02cbf9] to-[#01a8d0] hover:from-[#01b8e0] hover:to-[#0195ba] text-[#1a202c] font-black text-base rounded-xl transition-all duration-300 no-underline shadow-[0_4px_20px_rgba(2,203,249,0.35)] hover:shadow-[0_6px_28px_rgba(2,203,249,0.5)] hover:-translate-y-0.5"
            >
              <ShoppingBag size={18} />
              Continue to Buy
            </a>
          </div>
        )}
      </div>
    </>
  );
}
