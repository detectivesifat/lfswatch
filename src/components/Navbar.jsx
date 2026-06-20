import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, X, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import products from '../data/products';

export default function Navbar() {
  const { cartCount, toggleCart } = useCart();
  const [visible, setVisible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
          searchInputRef.current && !searchInputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setAtTop(currentScrollY < 10);
          if (currentScrollY < 10) {
            setVisible(true);
          } else if (currentScrollY > lastScrollY.current) {
            setVisible(false);
          } else {
            setVisible(true);
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
   <nav
  className={`fixed inset-x-0 top-0 z-50 h-18 flex justify-center transition-all duration-300 ease-in-out bg-dark-900/95 backdrop-blur-md border-b border-white/5 shadow-xl ${
    visible ? 'translate-y-0' : '-translate-y-full'
  }`}
>
  {/* Notice we removed mx-auto because the parent nav is now centering this div */}
  <div className="w-full h-full max-w-7xl  flex items-center justify-between ">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 no-underline shrink-0 group">
          <img
            src="/images/logo.svg"
            alt="LFS Watch"
            className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {/* Swapped flex-col to items-center for perfectly level alignment */}
          <div className="flex items-center h-full">
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none">
              LFS <span className="text-brand">Watch</span>
            </span>
          </div>
        </a>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 items-center mx-6 lg:mx-10 max-w-lg relative" ref={searchInputRef}>
          <form className="flex w-full items-center" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search for watches..."
              className="flex-1 h-11 pl-8 pr-5 bg-white/5 border border-white/10 rounded-l-xl outline-none text-sm text-white placeholder-white/30 focus:border-brand/60 focus:bg-white/10 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery.length > 0 && setShowDropdown(true)}
            />
            <button
              type="submit"
              className="h-11 w-12 flex items-center justify-center bg-brand rounded-r-xl hover:bg-[#01b0d8] transition-colors text-white"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Search Dropdown */}
          {showDropdown && searchQuery.length > 0 && filteredProducts.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-2 bg-[#0d1117] border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50 animate-slide-down"
            >
              <div className="grid grid-cols-1 gap-1 p-3 max-h-96 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <a
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors no-underline"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg flex-shrink-0 border border-white/5"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-semibold text-white/90 truncate">{product.name}</p>
                      <p className="text-xs font-bold text-brand">৳{product.price.toLocaleString()}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Mobile Search Toggle */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-brand transition-colors flex items-center justify-center"
            onClick={() => setSearchOpen(!searchOpen)}
            id="mobile-search-toggle"
          >
            {searchOpen ? <X size={22} /> : <Search size={22} />}
          </button>

          {/* Call Now - all devices */}
          <a
            href="tel:+8801577080024"
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl border border-brand/20 text-brand hover:bg-brand/10 hover:border-brand/50 transition-all duration-200 no-underline text-sm font-semibold"
          >
            <Phone size={15} />
            <span className="hidden sm:inline">Call Now</span>
          </a>

          {/* WhatsApp icon - all devices */}
          <a
            href="https://wa.me/8801577080024"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-green-500/20 text-green-400 hover:bg-green-500/10 hover:border-green-500/40 transition-all duration-200"
            title="WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>

          {/* Cart */}
          <button
            id="cart-toggle-btn"
            onClick={toggleCart}
            className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 text-white/70 hover:text-brand hover:border-brand/40 hover:bg-brand/5 transition-all duration-200"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand text-dark-900 text-xs font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Container */}
      {searchOpen && (
        <div className="md:hidden w-full max-w-7xl mx-auto px-5 pb-4 relative" ref={searchInputRef}>
          <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search for watches..."
              className="flex-1 h-10 pl-8 pr-4 bg-white/5 border border-white/10 rounded-l-xl outline-none text-sm text-white placeholder-white/30 focus:border-brand/60 transition-all"
              autoFocus
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery.length > 0 && setShowDropdown(true)}
            />
            <button
              type="submit"
              className="h-10 w-11 flex items-center justify-center bg-brand rounded-r-xl text-white"
            >
              <Search size={17} />
            </button>
          </form>

          {/* Mobile Search Dropdown */}
          {showDropdown && searchQuery.length > 0 && filteredProducts.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-2 bg-[#0d1117] border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50 animate-slide-down"
            >
              <div className="grid grid-cols-1 gap-1 p-3 max-h-96 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <a
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors no-underline"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg flex-shrink-0 border border-white/5"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-semibold text-white/90 truncate">{product.name}</p>
                      <p className="text-xs font-bold text-brand">৳{product.price.toLocaleString()}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}