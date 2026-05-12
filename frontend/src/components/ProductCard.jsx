import React from 'react';
import { Link } from 'react-router-dom';
import { getProductImageUrl } from '../api';
import { Tag } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 border border-slate-100 h-full flex flex-col">
        
        {/* Image Container */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 mb-4 flex items-center justify-center">
          <img 
            src={getProductImageUrl(product.id)} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400?text=No+Image';
            }}
          />
          {/* Badge */}
          {product.productAvailable ? (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-primary-600 rounded-full shadow-sm">
              In Stock
            </div>
          ) : (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-red-500 rounded-full shadow-sm">
              Out of Stock
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center space-x-1 text-xs text-slate-500 mb-2">
            <Tag className="w-3 h-3" />
            <span className="uppercase tracking-wider font-semibold">{product.category}</span>
            <span>&bull;</span>
            <span className="font-medium">{product.brand}</span>
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
            <span className="text-xl font-extrabold text-slate-900">
              ${product.price?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
