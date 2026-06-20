import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCheckout } from '../hooks/useCheckout';
import OrderSummary from '../components/checkout/OrderSummary';
import ShippingMethod from '../components/checkout/ShippingMethod';
import PaymentMethod from '../components/checkout/PaymentMethod';
import ActionButtons from '../components/checkout/ActionButtons';
import CopyProductInfo from '../components/checkout/CopyProductInfo';
import FacebookInstruction from '../components/checkout/FacebookInstruction';

export default function Checkout() {
  const {
    items,
    subtotal,
    shippingCost,
    total,
    shippingMethod,
    paymentMethod,
    couponCode,
    setCouponCode,
    copied,
    toast,
    copyText,
    shippingOptions,
    paymentOptions,
    handleCopy,
    handleWhatsAppOrder,
    handleFacebookOrder,
    handleQtyChange,
    handleRemove,
    handleShippingChange,
    handlePaymentChange,
  } = useCheckout();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#1a202c] pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#02cbf9] transition-colors no-underline mb-8 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Shop
          </Link>

          <div className="rounded-2xl p-10 sm:p-16 text-center bg-[#1f2937] border border-white/5 shadow-xl">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-white/3 border border-white/5 text-white/30 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-shopping-bag">
                <path d="M6 3h12"></path>
                <path d="M10 3v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6"></path>
                <path d="M18 3v11a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V6"></path>
              </svg>
            </div>
            <p className="text-lg font-bold text-white/70 mb-2">Your cart is empty</p>
            <p className="text-sm text-white/40 mb-6">Add some watches to your cart first.</p>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#02cbf9] to-[#01a8d0] hover:from-[#01b8e0] hover:to-[#0195ba] text-[#1a202c] font-black text-sm rounded-xl transition-all duration-300 no-underline shadow-[0_4px_20px_rgba(2,203,249,0.35)] hover:shadow-[0_6px_28px_rgba(2,203,249,0.5)] hover:-translate-y-0.5"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1a202c] pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#02cbf9] transition-colors no-underline mb-8 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left transition-transform group-hover:-translate-x-1">
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
          Back to Shop
        </Link>

        <h1 className="text-3xl sm:text-4xl font-black text-white mb-8 tracking-tight">
          Checkout
        </h1>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-4 right-4 z-50 animate-slide-up bg-[#02cbf9]/20 border-[#02cbf9]/30 text-[#02cbf9] px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
            {toast}
          </div>
        )}

        <div className="space-y-6">
          {/* Copy Product Info - at top */}
          <CopyProductInfo
            onCopy={handleCopy}
            copied={copied}
            copyText={copyText}
          />

          {/* Single combined checkout box */}
          <div className="bg-[#1f2937] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <OrderSummary
              items={items}
              onQtyChange={handleQtyChange}
              onRemove={handleRemove}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
            />

            <div className="border-t border-white/10" />

            <ShippingMethod
              options={shippingOptions}
              selected={shippingMethod}
              onChange={handleShippingChange}
            />

            <div className="border-t border-white/10" />

            <PaymentMethod
              options={paymentOptions}
              selected={paymentMethod}
              onChange={handlePaymentChange}
            />

            <div className="border-t border-white/10" />

            {/* Order Total */}
            <div>
              <div className="px-5 py-3.5 border-b border-white/10 bg-gradient-to-r from-[#02cbf9]/[0.03] to-transparent">
                <h2 className="font-extrabold text-lg text-white flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#02cbf9] rounded-full" />
                  Order Total
                </h2>
              </div>
              <div className="px-5 py-5 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-white/50 text-[15px]">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</p>
                  <p className="text-white font-bold text-[15px]">৳{subtotal.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-white/50 text-[15px]">Shipping (+)</p>
                  <p className="text-white font-bold text-[15px]">৳{shippingCost.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <p className="font-extrabold text-white text-base">Total</p>
                  <p className="font-extrabold text-[#02cbf9] text-lg">৳{total.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <ActionButtons
            onWhatsAppOrder={handleWhatsAppOrder}
            onFacebookOrder={handleFacebookOrder}
            onCopy={handleCopy}
            copied={copied}
          />

          {/* Facebook Instruction */}
          <FacebookInstruction />
        </div>
      </div>
    </main>
  );
}