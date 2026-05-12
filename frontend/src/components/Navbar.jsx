import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              NexusCart
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/add-product" 
              className="flex items-center space-x-1 px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors duration-200 shadow-lg shadow-slate-900/20"
            >
              <PlusCircle className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">Add Product</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
