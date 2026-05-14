import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit, Trash2, MapPin, X, Search, Filter, Package } from 'lucide-react';
import { PRODUCTS } from '../../lib/data';

const INITIAL_WAREHOUSES = [
  { id: 1, name: 'Main Fulfillment Center', location: 'Los Angeles, CA', capability: 'Regional Distribution' },
  { id: 2, name: 'East Coast Hub', location: 'Newark, NJ', capability: 'Cross-docking' },
];

const WAREHOUSE_NAMES = INITIAL_WAREHOUSES.map(w => w.name);

// Mock inventory data mapped to products
const INITIAL_INVENTORY = PRODUCTS.map(p => ({
  productId: p.id,
  name: p.name,
  category: p.category,
  image: p.image,
  stock: WAREHOUSE_NAMES.reduce((acc, w) => ({ ...acc, [w]: Math.floor(Math.random() * 50) + 10 }), {} as Record<string, number>),
}));

export function Warehouses() {
  const [activeTab, setActiveTab] = useState<'locations' | 'inventory'>('locations');
  const [warehouses, setWarehouses] = useState(INITIAL_WAREHOUSES);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');

  // Location Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', capability: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Inventory Modal states
  const [editingItem, setEditingItem] = useState<typeof INITIAL_INVENTORY[0] | null>(null);
  const [stockUpdates, setStockUpdates] = useState<Record<string, string>>({});

  // Locations Handlers
  const openModal = (warehouse?: typeof INITIAL_WAREHOUSES[0]) => {
    if (warehouse) {
      setFormData({ name: warehouse.name, location: warehouse.location, capability: warehouse.capability });
      setEditingId(warehouse.id);
    } else {
      setFormData({ name: '', location: '', capability: '' });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setWarehouses(warehouses.map(w => w.id === editingId ? { ...w, ...formData } : w));
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Warehouse updated' }));
    } else {
      setWarehouses([...warehouses, { id: Date.now(), ...formData }]);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Warehouse added' }));
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this warehouse?')) {
      setWarehouses(warehouses.filter(w => w.id !== id));
      window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Warehouse deleted' }));
    }
  };

  // Inventory Handlers
  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStock = (stockData: Record<string, number>) => Object.values(stockData).reduce((a, b) => a + b, 0);

  const openInventoryModal = (item: typeof INITIAL_INVENTORY[0]) => {
    setEditingItem(item);
    const initialUpdates = Object.keys(item.stock).reduce((acc, w) => ({ ...acc, [w]: String(item.stock[w]) }), {});
    setStockUpdates(initialUpdates);
  };

  const handleSaveInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const newStockData = { ...editingItem.stock };
    Object.keys(stockUpdates).forEach(w => {
      const parsed = parseInt(stockUpdates[w], 10);
      if (!isNaN(parsed) && parsed >= 0) {
        newStockData[w] = parsed;
      }
    });

    setInventory(inventory.map(item => item.productId === editingItem.productId ? { ...item, stock: newStockData } : item));
    setEditingItem(null);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Stock updated successfully' }));
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif mb-2">Warehouse Management</h1>
          <p className="text-ink-light">Manage storage locations and track product stock.</p>
        </div>
        {activeTab === 'locations' && (
          <button onClick={() => openModal()} className="px-4 py-2 bg-ink text-white text-xs uppercase tracking-widest font-medium hover:bg-clay transition-colors flex gap-2 items-center">
            <Plus className="w-4 h-4" /> Add Location
          </button>
        )}
      </motion.div>

      <div className="flex border-b border-stone mb-8">
        <button 
          onClick={() => setActiveTab('locations')}
          className={`px-6 py-3 text-sm font-medium uppercase tracking-widest transition-colors relative ${activeTab === 'locations' ? 'text-ink' : 'text-ink-light hover:text-ink'}`}
        >
          Locations
          {activeTab === 'locations' && (
            <motion.div layoutId="warehouse-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`px-6 py-3 text-sm font-medium uppercase tracking-widest transition-colors relative ${activeTab === 'inventory' ? 'text-ink' : 'text-ink-light hover:text-ink'}`}
        >
          Inventory (Stock)
          {activeTab === 'inventory' && (
            <motion.div layoutId="warehouse-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink" />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'locations' ? (
          <motion.div 
            key="locations"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {warehouses.map(w => (
              <div key={w.id} className="bg-white border border-stone p-6 flex flex-col group">
                <div className="w-12 h-12 bg-stone flex items-center justify-center rounded-full text-ink mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl mb-1">{w.name}</h3>
                <p className="text-sm text-ink-light mb-4">{w.location}</p>
                <div className="mt-auto pt-4 border-t border-stone flex justify-between items-center">
                  <span className="text-xs uppercase tracking-widest font-medium text-clay">{w.capability}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openModal(w)} className="text-ink-light hover:text-ink"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(w.id)} className="text-ink-light hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="inventory"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white border border-stone flex flex-col flex-1 min-h-[500px]"
          >
            <div className="p-4 border-b border-stone flex flex-col md:flex-row gap-4 justify-between items-center bg-stone/20">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
                <input 
                  type="text" 
                  placeholder="Search inventory..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-stone outline-none focus:border-clay text-sm"
                />
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead className="text-xs text-ink-light uppercase tracking-widest border-b border-stone bg-stone/5">
                  <tr>
                    <th className="px-6 py-4 font-medium">Product</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium text-right">Total Stock</th>
                    <th className="px-6 py-4 font-medium text-right">Locations</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredInventory.map((item) => (
                    <tr key={item.productId} className="hover:bg-stone/30 transition-colors group border-b border-stone/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-stone shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium whitespace-nowrap">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-ink-light">{item.category}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-2 px-2 py-1 bg-stone text-ink font-medium rounded-sm">
                          <Package className="w-3 h-3" />
                          {totalStock(item.stock)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-ink-light text-xs">
                        {Object.entries(item.stock).map(([w, qty]) => (
                          <div key={w} className="mb-0.5"><span className="text-ink font-medium">{qty}</span> in {w}</div>
                        ))}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => openInventoryModal(item)}
                          className="text-ink-light hover:text-clay transition-colors uppercase tracking-widest text-[10px] font-medium p-2 border border-stone hover:border-clay"
                        >
                          Update Stock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg bg-white border border-stone shadow-xl flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-stone">
                <h2 className="font-serif text-2xl">{editingId ? 'Edit Warehouse' : 'New Warehouse'}</h2>
                <button onClick={closeModal} className="text-ink-light hover:text-ink transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Warehouse Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border-b border-stone py-2 outline-none focus:border-clay" placeholder="e.g. West Coast Hub" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Location</label>
                  <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="border-b border-stone py-2 outline-none focus:border-clay" placeholder="e.g. Seattle, WA" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-ink-light font-medium">Capability</label>
                  <input type="text" required value={formData.capability} onChange={e => setFormData({...formData, capability: e.target.value})} className="border-b border-stone py-2 outline-none focus:border-clay" placeholder="e.g. Returns Processing" />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button type="button" onClick={closeModal} className="px-6 py-3 border border-stone hover:border-ink transition-colors text-sm uppercase tracking-widest font-medium">Cancel</button>
                  <button type="submit" className="px-6 py-3 bg-ink text-white hover:bg-clay transition-colors text-sm uppercase tracking-widest font-medium">Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
        
        {editingItem && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setEditingItem(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-white border border-stone shadow-xl flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-stone">
                <div>
                  <h2 className="font-serif text-2xl mb-1">Update Stock</h2>
                  <p className="text-sm text-ink-light">{editingItem.name}</p>
                </div>
                <button onClick={() => setEditingItem(null)} className="text-ink-light hover:text-ink transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSaveInventory} className="p-6 flex flex-col gap-6">
                {Object.keys(editingItem.stock).map(w => (
                  <div key={w} className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-ink-light font-medium">{w} (Quantity)</label>
                    <input 
                      type="number" 
                      min="0"
                      required 
                      value={stockUpdates[w] || ''} 
                      onChange={e => setStockUpdates({...stockUpdates, [w]: e.target.value})} 
                      className="border-b border-stone py-2 outline-none focus:border-clay" 
                    />
                  </div>
                ))}
                
                <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-stone">
                  <button type="button" onClick={() => setEditingItem(null)} className="px-6 py-3 border border-stone hover:border-ink transition-colors text-sm uppercase tracking-widest font-medium">Cancel</button>
                  <button type="submit" className="px-6 py-3 bg-ink text-white hover:bg-clay transition-colors text-sm uppercase tracking-widest font-medium">Save Stock</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
