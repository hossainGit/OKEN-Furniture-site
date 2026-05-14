import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, X } from 'lucide-react';
import { PRODUCTS } from '../../lib/data';

type Product = typeof PRODUCTS[0];

export function Products() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    spaces: '',
  });

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.replace('$', ''),
        category: product.category,
        image: product.image,
        description: product.description,
        spaces: product.spaces.join(', '),
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', category: '', image: '', description: '', spaces: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.name,
      price: `$${formData.price}`,
      category: formData.category,
      image: formData.image || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop', // default image
      description: formData.description,
      spaces: formData.spaces.split(',').map(s => s.trim()).filter(s => s !== '')
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Product updated successfully' }));
    } else {
      setProducts([newProduct, ...products]);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Product added successfully' }));
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Product deleted' }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif mb-2">Products</h1>
          <p className="text-ink-light">Manage your inventory and product details</p>
        </div>
        <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-ink text-white text-xs uppercase tracking-widest font-medium hover:bg-clay transition-colors flex gap-2 items-center">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </motion.div>

      <div className="bg-white border border-stone flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone flex flex-col md:flex-row gap-4 justify-between items-center bg-stone/20">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-stone py-2 pl-10 pr-4 text-sm outline-none focus:border-clay"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-stone text-xs uppercase tracking-widest font-medium hover:bg-stone transition-colors">
              <Filter className="w-3 h-3" /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-ink-light uppercase tracking-widest border-b border-stone bg-white">
              <tr>
                <th className="px-6 py-4 font-medium w-16">Image</th>
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Spaces</th>
                <th className="px-6 py-4 font-medium text-right">Price</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-stone/30 transition-colors group">
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 bg-stone object-cover overflow-hidden">
                         <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-serif font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-ink-light">{product.category}</td>
                    <td className="px-6 py-4 text-ink-light">
                      <div className="flex flex-wrap gap-1">
                        {product.spaces.map(s => (
                          <span key={s} className="px-2 py-0.5 bg-stone text-[10px] uppercase">{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">{product.price}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(product)} className="text-ink-light hover:text-clay transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="text-ink-light hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-ink-light">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
              onClick={handleCloseModal}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white border border-stone shadow-xl flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-stone">
                <h2 className="font-serif text-2xl">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={handleCloseModal} className="text-ink-light hover:text-ink transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Product Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="border-b border-stone py-2 outline-none focus:border-clay"
                      placeholder="e.g. Arc Lounge Chair"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Price (USD) *</label>
                    <input 
                      type="number" 
                      required 
                      min="0"
                      step="0.01"
                      value={formData.price} 
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="border-b border-stone py-2 outline-none focus:border-clay"
                      placeholder="e.g. 1299.00"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Category *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="border-b border-stone py-2 outline-none focus:border-clay"
                      placeholder="e.g. Seating"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Spaces (comma separated) *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.spaces} 
                      onChange={e => setFormData({...formData, spaces: e.target.value})}
                      className="border-b border-stone py-2 outline-none focus:border-clay"
                      placeholder="e.g. Living Room, Office"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Image URL</label>
                  <input 
                    type="url" 
                    value={formData.image} 
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="border-b border-stone py-2 outline-none focus:border-clay"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Description *</label>
                  <textarea 
                    required 
                    rows={4}
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="border-b border-stone py-2 outline-none focus:border-clay resize-y"
                    placeholder="Product description..."
                  />
                </div>

                <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-stone">
                  <button type="button" onClick={handleCloseModal} className="px-6 py-3 border border-stone hover:border-ink transition-colors text-sm uppercase tracking-widest font-medium">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-3 bg-ink text-white hover:bg-clay transition-colors text-sm uppercase tracking-widest font-medium">
                    {editingProduct ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
