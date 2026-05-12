import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../api';
import { Upload, ArrowLeft } from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    category: '',
    releaseDate: '',
    productAvailable: true,
    stockQuantity: ''
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedData = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity, 10),
        // Formatting date to ISO or standard format expected by backend if necessary
        releaseDate: new Date(formData.releaseDate).toISOString()
      };

      await addProduct(formattedData, imageFile);
      navigate('/');
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Error adding product. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to catalog</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8 sm:p-12">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Add New Product</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Product Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="Enter product name"/>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Brand</label>
                  <input type="text" name="brand" required value={formData.brand} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="Enter brand name"/>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <input type="text" name="category" required value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="e.g. Electronics"/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Price ($)</label>
                    <input type="number" step="0.01" name="price" required value={formData.price} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="0.00"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Stock Qty</label>
                    <input type="number" name="stockQuantity" required value={formData.stockQuantity} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="100"/>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Release Date</label>
                  <input type="date" name="releaseDate" required value={formData.releaseDate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"/>
                </div>
                
                <div className="flex items-center space-x-3 pt-2">
                  <input type="checkbox" name="productAvailable" checked={formData.productAvailable} onChange={handleChange} className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"/>
                  <label className="text-sm font-medium text-slate-700">Product is available for purchase</label>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea name="description" required value={formData.description} onChange={handleChange} rows="5" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none" placeholder="Describe the product..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Product Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-primary-500 transition-colors relative bg-slate-50 overflow-hidden">
                    {imagePreview ? (
                      <div className="absolute inset-0 w-full h-full">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                           <span className="text-white font-medium">Click to change</span>
                        </div>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      </div>
                    ) : (
                      <div className="space-y-1 text-center py-8">
                        <Upload className="mx-auto h-12 w-12 text-slate-400" />
                        <div className="flex text-sm text-slate-600 mt-4">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                            <span>Upload a file</span>
                            <input type="file" accept="image/*" required onChange={handleImageChange} className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">PNG, JPG, WEBP up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-slate-100 flex justify-end">
              <button 
                type="submit" 
                disabled={loading || !imageFile}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary-600/30 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto min-w-[200px]"
              >
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
