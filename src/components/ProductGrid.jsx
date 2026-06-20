import ProductCard from './ProductCard';
import products from '../data/products';

export default function ProductGrid() {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-5 sm:pb-10">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
          Our <span className="text-[#02cbf9]">Collection</span>
        </h2>

        <div className="flex items-center justify-center gap-2 mt-5">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#02cbf9] rounded-full" />
          <div className="w-2 h-2 rounded-full bg-[#02cbf9]" />
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#02cbf9] rounded-full" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
