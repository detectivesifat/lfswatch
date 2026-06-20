import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, MessageCircle, Clipboard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import products from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === Number(id));
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addItem(product);
    navigate('/checkout');
  };

  const orderText = product
    ? `I want to order: ${product.name} - ৳${product.price.toLocaleString()}\n\nOrder via LFS Watch`
    : '';

  const handleWhatsAppOrder = () => {
    window.open(`https://wa.me/8801577080024?text=${encodeURIComponent(orderText)}`, '_blank');
  };

  const handleFacebookOrder = () => {
    window.open('https://m.me/lfswatch', '_blank');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // silent
    }
  };

  if (!product) {
    return (
      <main className="min-h-screen bg-[#080c10] pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <p className="text-white/60 text-lg">Product not found.</p>
          <Link to="/" className="text-[#02cbf9] hover:underline mt-4 inline-block">Back to Shop</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080c10] pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#02cbf9] transition-colors no-underline mb-8 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Shop
        </Link>

        {/* Product Section: Image + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left: Image */}
          <div className="rounded-2xl overflow-hidden border border-white/5 bg-white shadow-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-3">
              {product.name}
            </h1>

            <p className="text-2xl sm:text-3xl font-black text-[#02cbf9] mb-8">
              ৳{product.price.toLocaleString()}
            </p>

            {/* Buy Now + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 bg-[#02cbf9] text-[#080c10] font-black text-base rounded-xl transition-colors duration-200 hover:bg-[#080c10] hover:text-[#02cbf9] hover:border hover:border-[#02cbf9] cursor-pointer"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-5 font-black text-base rounded-xl transition-all duration-300 cursor-pointer border ${
                  added
                    ? 'bg-green-500/10 border-green-500/40 text-green-400'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-[#02cbf9] hover:border-[#02cbf9] hover:text-[#080c10] hover:shadow-[0_4px_16px_rgba(2,203,249,0.3)]'
                }`}
              >
                {added ? <><Check size={18} /> Added!</> : <><ShoppingCart size={18} /> Add to Cart</>}
              </button>
            </div>

            {/* Order via WhatsApp + Facebook */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 bg-green-500 text-white font-black text-base rounded-xl transition-colors duration-200 hover:bg-white hover:text-green-500 active:bg-green-400 active:text-white cursor-pointer"
              >
                <MessageCircle size={18} />
                Order via WhatsApp
              </button>
              <button
                onClick={handleFacebookOrder}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 bg-blue-500 text-white font-black text-base rounded-xl transition-colors duration-200 hover:bg-white hover:text-blue-500 active:bg-blue-400 active:text-white cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Order via Facebook
              </button>
            </div>

            {/* Copy Product Info */}
            <button
              onClick={() => { handleCopy(); setShowPreview(!showPreview); }}
              className={`flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer w-full sm:w-auto ${
                copied
                  ? 'bg-green-500/20 border-green-500/30 text-green-400 cursor-default'
                  : 'bg-[#02cbf9]/20 border-[#02cbf9]/30 text-[#02cbf9] hover:bg-[#02cbf9]/30 hover:border-[#02cbf9]/50'
              }`}
              disabled={copied}
            >
              {copied ? <><Check size={16} /> Copied!</> : <><Clipboard size={16} /> Copy Product Information</>}
            </button>

            {/* Copied text preview */}
            {showPreview && (
              <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-xs font-semibold text-white/40 mb-2">Copied text preview:</p>
                <pre className="text-sm text-white/80 whitespace-pre-wrap font-sans leading-relaxed">
                  {orderText}
                </pre>
              </div>
            )}

            {/* Facebook Instruction Note */}
            <p className="text-sm text-white/70 mt-5 leading-relaxed">
              <strong className="text-red-500">Note:</strong> After clicking &quot;Order via Facebook&quot;, the Facebook Messenger
              will open. <strong>Paste the copied product information</strong> (using the
              &quot;Copy Product Information&quot; button above) into the chat to send us your
              order details.
            </p>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-5 py-3.5 border-b border-white/10 bg-gradient-to-r from-[#02cbf9]/[0.03] to-transparent">
            <h2 className="font-extrabold text-lg text-white flex items-center gap-2">
              <div className="w-1 h-5 bg-[#02cbf9] rounded-full" />
              Product Specifications
            </h2>
          </div>
          <div className="px-5 py-5">
            <table className="w-full">
              <tbody>
                {product.specs.map((spec, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                    <td className="py-3 px-4 text-sm font-semibold text-white/60 w-1/3 border-b border-white/5">
                      {spec.label}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-white border-b border-white/5">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
