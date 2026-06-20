import { Minus, Plus, Trash2, Tag } from 'lucide-react';

export default function OrderSummary({
  items,
  onQtyChange,
  onRemove,
  couponCode,
  setCouponCode,
}) {
  return (
    <>
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-white/10 bg-gradient-to-r from-[#02cbf9]/[0.03] to-transparent">
        <h2 className="font-extrabold text-lg text-white flex items-center gap-2">
          <div className="w-1 h-5 bg-[#02cbf9] rounded-full" />
          Order Summary
        </h2>
      </div>

      {/* Order Items */}
      <div className="divide-y divide-white/5">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between px-5 py-4 group">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="p-1 rounded-md text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer flex-shrink-0"
                aria-label="Remove item"
              >
                <Trash2 size={15} />
              </button>
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                width="56"
                height="56"
                className="rounded-lg border border-white/10 object-cover flex-shrink-0 w-14 h-14"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-white leading-tight truncate max-w-[200px]">
                  {item.name}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <button
                    type="button"
                    onClick={() => onQtyChange(item.id, -1)}
                    disabled={item.quantity <= 1}
                    className="w-7 h-7 flex items-center justify-center border border-white/10 rounded text-sm transition-colors text-white/50 hover:text-white hover:border-[#02cbf9]/50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-white">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onQtyChange(item.id, 1)}
                    className="w-7 h-7 flex items-center justify-center border border-white/10 rounded cursor-pointer hover:bg-white/5 text-white/50 hover:text-white hover:border-[#02cbf9]/50 transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
            <p className="font-bold text-[#02cbf9] text-[15px] whitespace-nowrap">
              ৳{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Coupon Code */}
      <div className="px-5 py-4 border-t border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="text-[#02cbf9]" size={16} />
          <p className="text-sm font-semibold text-white">Have a coupon code?</p>
        </div>
        <div className="flex items-center gap-2.5">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 h-10 px-4 text-sm font-medium border border-white/10 rounded-xl outline-none bg-white/3 focus:border-[#02cbf9]/60 focus:bg-white/5 focus:ring-1 focus:ring-[#02cbf9]/10 transition-all duration-200 text-white placeholder-white/30"
          />
          <button
            type="button"
            disabled
            className="px-5 py-2 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-1.5 bg-white/5 text-white/30 cursor-not-allowed"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}