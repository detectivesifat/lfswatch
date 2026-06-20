import { useState, useCallback, useMemo } from 'react';
import { useCart } from '../context/CartContext';

const SHIPPING_OPTIONS = [
  { id: 'dhaka-city', label: 'Dhaka City', price: 60 },
  { id: 'all-bangladesh', label: 'All Bangladesh', price: 100 },
];

const PAYMENT_OPTIONS = [
  { id: 'cod', label: 'Cash On Delivery' },
  { id: 'bkash', label: 'Pay On Cellfin / Bkash / Nagad / Rocket' },
];

export function useCheckout() {
  const { items, cartTotal, updateQuantity, removeItem, clearCart } = useCart();

  const [shippingMethod, setShippingMethod] = useState('dhaka-city');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [couponCode, setCouponCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);

  const shippingCost = useMemo(() => {
    const opt = SHIPPING_OPTIONS.find(o => o.id === shippingMethod);
    return opt ? opt.price : 0;
  }, [shippingMethod]);

  const subtotal = cartTotal;
  const total = subtotal + shippingCost;

  const copyText = useMemo(() => {
    if (items.length === 0) return '';
    const lines = [
      'Order Summary:',
      ...items.map(item => `- ${item.name} × ${item.quantity} = ৳${(item.price * item.quantity).toLocaleString()}`),
      '',
      `Subtotal: ৳${subtotal.toLocaleString()}`,
      `Shipping: ৳${shippingCost.toLocaleString()}`,
      `Total: ৳${total.toLocaleString()}`,
      '',
      'Order via LFS Watch',
    ];
    return lines.join('\n');
  }, [items, subtotal, shippingCost, total]);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast('Product information copied to clipboard!');
    } catch (err) {
      showToast('Failed to copy. Please try again.');
    }
  }, [copyText, showToast]);

  const handleWhatsAppOrder = useCallback(() => {
    const url = `https://wa.me/8801577080024?text=${encodeURIComponent(copyText)}`;
    window.open(url, '_blank');
    showToast('Opening WhatsApp...');
  }, [copyText, showToast]);

  const handleFacebookOrder = useCallback(() => {
    window.open('https://m.me/lfswatch', '_blank');
    showToast('Opened Facebook Messenger. Paste the product info in the chat.');
  }, [showToast]);

  const handleQtyChange = useCallback((productId, delta) => {
    updateQuantity(productId, delta);
  }, [updateQuantity]);

  const handleRemove = useCallback((productId) => {
    removeItem(productId);
  }, [removeItem]);

  const handleShippingChange = useCallback((methodId) => {
    setShippingMethod(methodId);
  }, []);

  const handlePaymentChange = useCallback((methodId) => {
    setPaymentMethod(methodId);
  }, []);

  return {
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
    shippingOptions: SHIPPING_OPTIONS,
    paymentOptions: PAYMENT_OPTIONS,
    handleCopy,
    handleWhatsAppOrder,
    handleFacebookOrder,
    handleQtyChange,
    handleRemove,
    handleShippingChange,
    handlePaymentChange,
    clearCart,
  };
}