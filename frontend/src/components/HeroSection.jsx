import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-dark-900 my-8 mx-4 sm:mx-8 shadow-2xl animate-fade-in">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative px-6 py-16 sm:px-12 sm:py-24 lg:py-32 lg:px-16 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 animate-slide-up">
          Discover Next-Gen <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-300">
            Tech & Lifestyle
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg sm:text-xl text-slate-300 mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Explore our handpicked collection of premium gadgets, stylish apparel, and everyday essentials designed for modern living.
        </p>
        <button className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary-500/30 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <span>Shop Now</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
