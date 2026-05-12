import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProducts, searchProducts } from '../api';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');

    const loadProducts = async () => {
      setLoading(true);
      try {
        let data;
        if (searchQuery) {
          data = await searchProducts(searchQuery);
        } else {
          data = await fetchProducts();
        }
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [location.search]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto">
        <HeroSection />

        <div className="px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              {new URLSearchParams(location.search).get('search') 
                ? 'Search Results' 
                : 'Featured Products'}
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-medium text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-500">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
