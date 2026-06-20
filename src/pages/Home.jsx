import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a202c]">
      <HeroBanner />
      <ProductGrid />
    </main>
  );
}
