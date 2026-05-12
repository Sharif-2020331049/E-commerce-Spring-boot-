import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, getProductImageUrl } from '../api';
import { ArrowLeft, CheckCircle2, XCircle, ShoppingCart } from 'lucide-react';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleDelete = async () => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8080/api/product/${id}`);
        navigate('/');
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/')} className="text-primary-600 hover:underline">
          Go back to home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to catalog</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Image Section */}
          <div className="w-full md:w-1/2 p-8 lg:p-12 bg-slate-100 flex items-center justify-center">
            <img 
              src={getProductImageUrl(product.id)} 
              alt={product.name}
              className="w-full max-w-md rounded-2xl shadow-2xl object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600?text=No+Image';
              }}
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col">
            <div className="mb-2">
              <span className="text-sm font-bold text-primary-600 tracking-wider uppercase">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {product.name}
            </h1>
            
            <div className="text-xl text-slate-500 mb-6">
              by <span className="font-semibold text-slate-700">{product.brand}</span>
            </div>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center space-x-6 mb-8">
              <div className="text-4xl font-black text-slate-900">
                ${product.price?.toFixed(2)}
              </div>
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium ${
                product.productAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {product.productAvailable ? (
                  <><CheckCircle2 className="w-5 h-5"/> <span>In Stock ({product.stockQuantity})</span></>
                ) : (
                  <><XCircle className="w-5 h-5"/> <span>Out of Stock</span></>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto pt-8 border-t border-slate-100 flex gap-4">
              <button 
                className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!product.productAvailable}
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Add to Cart</span>
              </button>
              
              <button 
                onClick={handleDelete}
                className="px-6 py-4 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
