import React, { useEffect, useState } from "react";
import { Product } from "./types";
import { getProducts, createProduct, deleteProduct, getCategories, updateProduct } from "./api";
import ProductList from "./component/ProductList";
import "./App.css"; // Ensure you created this file!

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // Form Field States
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [manuDate, setManuDate] = useState("2026-01-01");
  const [expDate, setExpDate] = useState("2027-01-01");
  const [selectedCategory, setSelectedCategory] = useState<number>(1);

  // Mode States
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchInitialData = async () => {
    try {
      const [prodData, catData] = await Promise.all([getProducts(), getCategories()]);
      setProducts(prodData);
      setCategories(catData);
      if (catData.length > 0 && !isEditing) {
        setSelectedCategory(catData[0].id || catData[0].category_id);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Calculation Logic
  const totalValue = products.reduce((sum, product) => sum + Number(product.price), 0);

  const startEdit = (product: Product) => {
    setIsEditing(true);
    setEditId(product.product_id);
    setName(product.product_name);
    setPrice(product.price);
    setSelectedCategory(product.category);
    setManuDate(product.manu_date);
    setExpDate(product.exp_date);
  };

  const handleSave = async () => {
    const payload = {
      product_name: name,
      price: price,
      category: selectedCategory,
      manu_date: manuDate,
      exp_date: expDate
    };

    try {
      if (isEditing && editId) {
        await updateProduct(editId, payload); 
      } else {
        await createProduct(payload); 
      }
      resetForm();
      fetchInitialData();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      fetchInitialData();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setName("");
    setPrice(0);
    setManuDate("2026-01-01");
    setExpDate("2027-01-01");
  };

  return (
    <div className="dashboard-container">
      <h1 style={{ textAlign: "center", color: "#1a73e8", marginBottom: "30px" }}>
        Inventory Manager
      </h1>
      
      <div className="form-card">
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label><small>Product Name</small></label>
          <input placeholder="e.g. Lenovo Laptop" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label><small>Price (₱)</small></label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label><small>Category</small></label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(Number(e.target.value))}>
            {categories.map((cat) => (
              <option key={cat.id || cat.category_id} value={cat.id || cat.category_id}>
                {cat.name || cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label><small>Mfg Date</small></label>
          <input type="date" value={manuDate} onChange={(e) => setManuDate(e.target.value)} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label><small>Exp Date</small></label>
          <input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} />
        </div>
        
        <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
          <button 
            onClick={handleSave} 
            style={{ 
              backgroundColor: isEditing ? "#ffc107" : "#1a73e8", 
              color: "white",
              width: "100%",
              height: "40px"
            }}
          >
            {isEditing ? "Update Item" : "Add Product"}
          </button>
          {isEditing && (
            <button onClick={resetForm} style={{ height: "40px", backgroundColor: "#6c757d", color: "white" }}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "20px 0" }} />

      <ProductList 
        products={products} 
        onDelete={handleDelete} 
        onEdit={startEdit} 
      />

      <div style={{ 
        marginTop: "30px", 
        padding: "20px", 
        backgroundColor: "#f8f9fa", 
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ margin: 0, fontSize: "1.2em" }}>Total Portfolio Value</h2>
        <span className="price-tag" style={{ fontSize: "1.5em" }}>
          ₱{totalValue.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default App;