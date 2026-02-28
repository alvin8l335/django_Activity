import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Category, Product, Customer, Order } from './types';
import { DataTable } from './components/DataTable';

const API_BASE = "http://localhost:8000/api";

function App() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    
    // UI State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState<'categories' | 'products' | 'customers'>('categories');
    const [formData, setFormData] = useState<any>({});
    const [editingId, setEditingId] = useState<number | null>(null);

    const refreshData = async () => {
        try {
            const [c, p, cust] = await Promise.all([
                axios.get(`${API_BASE}/categories/`),
                axios.get(`${API_BASE}/products/`),
                axios.get(`${API_BASE}/customers/`)
            ]);
            setCategories(c.data);
            setProducts(p.data);
            setCustomers(cust.data);
        } catch (err) { console.error("Error loading data", err); }
    };

    useEffect(() => { refreshData(); }, []);

    // Open Modal for Add
    const openAddModal = (view: 'categories' | 'products' | 'customers') => {
        setCurrentView(view);
        setEditingId(null);
        setFormData({});
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const openEditModal = (view: any, item: any, idField: string) => {
        setCurrentView(view);
        setEditingId(item[idField]);
        setFormData(item);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const endpoint = `${API_BASE}/${currentView}/`;
        try {
            if (editingId) {
                await axios.put(`${endpoint}${editingId}/`, formData);
            } else {
                await axios.post(endpoint, formData);
            }
            setIsModalOpen(false);
            refreshData();
        } catch (err) { alert("Error saving data. Check console."); }
    };

    const handleDelete = async (endpoint: string, id: number) => {
        if (window.confirm("Delete this item?")) {
            await axios.delete(`${API_BASE}/${endpoint}/${id}/`);
            refreshData();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto space-y-10">
                
                {/* 1. CATEGORIES TABLE */}
                <DataTable 
                    title="Categories" 
                    headers={['ID', 'Name']} 
                    data={categories} 
                    onAdd={() => openAddModal('categories')}
                    renderRow={(c: Category) => (
                        <tr key={c.category_id}>
                            <td className="px-6 py-4">{c.category_id}</td>
                            <td className="px-6 py-4 font-bold">{c.category_name}</td>
                            <td className="px-6 py-4 text-right space-x-4">
                                <button onClick={() => openEditModal('categories', c, 'category_id')} className="text-indigo-600 hover:underline">Edit</button>
                                <button onClick={() => handleDelete('categories', c.category_id)} className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    )}
                />

                {/* 2. PRODUCTS TABLE */}
                <DataTable 
                    title="Products" 
                    headers={['Name', 'Price', 'Exp Date']} 
                    data={products} 
                    onAdd={() => openAddModal('products')}
                    renderRow={(p: Product) => (
                        <tr key={p.product_id}>
                            <td className="px-6 py-4">{p.product_name}</td>
                            <td className="px-6 py-4 text-green-600 font-bold">${p.price}</td>
                            <td className="px-6 py-4">{p.exp_date}</td>
                            <td className="px-6 py-4 text-right space-x-4">
                                <button onClick={() => openEditModal('products', p, 'product_id')} className="text-indigo-600 hover:underline">Edit</button>
                                <button onClick={() => handleDelete('products', p.product_id)} className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    )}
                />

                {/* 3. CUSTOMERS TABLE */}
                <DataTable 
                    title="Customers" 
                    headers={['Name', 'Contact', 'Address']} 
                    data={customers} 
                    onAdd={() => openAddModal('customers')}
                    renderRow={(cust: Customer) => (
                        <tr key={cust.customer_id}>
                            <td className="px-6 py-4">{cust.name}</td>
                            <td className="px-6 py-4">{cust.contact}</td>
                            <td className="px-6 py-4">{cust.address}</td>
                            <td className="px-6 py-4 text-right space-x-4">
                                <button onClick={() => openEditModal('customers', cust, 'customer_id')} className="text-indigo-600 hover:underline">Edit</button>
                                <button onClick={() => handleDelete('customers', cust.customer_id)} className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    )}
                />
            </div>

            {/* SHARED MODAL FORM */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-indigo-700">
                            {editingId ? 'Edit' : 'Add'} {currentView.slice(0, -1)}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {currentView === 'categories' && (
                                <input 
                                    className="w-full border p-2 rounded" 
                                    placeholder="Category Name"
                                    value={formData.category_name || ''}
                                    onChange={e => setFormData({...formData, category_name: e.target.value})}
                                    required
                                />
                            )}
                            {currentView === 'customers' && (
                                <>
                                    <input className="w-full border p-2 rounded" placeholder="Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required />
                                    <input className="w-full border p-2 rounded" placeholder="Address" value={formData.address || ''} onChange={e => setFormData({...formData, address: e.target.value})} required />
                                    <input className="w-full border p-2 rounded" type="number" placeholder="Contact" value={formData.contact || ''} onChange={e => setFormData({...formData, contact: e.target.value})} required />
                                    <input className="w-full border p-2 rounded" type="number" placeholder="Age" value={formData.age || ''} onChange={e => setFormData({...formData, age: e.target.value})} required />
                                </>
                            )}
                            {currentView === 'products' && (
                                <>
                                    <input className="w-full border p-2 rounded" placeholder="Product Name" value={formData.product_name || ''} onChange={e => setFormData({...formData, product_name: e.target.value})} required />
                                    <input className="w-full border p-2 rounded" type="number" placeholder="Price" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} required />
                                    <input className="w-full border p-2 rounded" type="date" placeholder="Manu Date" value={formData.manu_date || ''} onChange={e => setFormData({...formData, manu_date: e.target.value})} required />
                                    <input className="w-full border p-2 rounded" type="date" placeholder="Exp Date" value={formData.exp_date || ''} onChange={e => setFormData({...formData, exp_date: e.target.value})} required />
                                    <select 
                                        className="w-full border p-2 rounded"
                                        value={formData.category || ''}
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                                        ))}
                                    </select>
                                </>
                            )}
                            <div className="flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;