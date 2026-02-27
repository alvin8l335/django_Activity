import React from "react";
import { Product } from "../types";

interface Props {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void; 
}

const ProductList: React.FC<Props> = ({ products, onDelete, onEdit }) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {products.map((product) => (
        <li key={product.product_id} style={{ padding: "15px 10px", borderBottom: "1px solid #ddd" }}>
          <div style={{ marginBottom: "5px" }}>
            <strong style={{ fontSize: "1.1em" }}>{product.product_name}</strong> 
            <span style={{ margin: "0 10px", color: "#666" }}>—</span> 
            <span style={{ fontWeight: "bold", color: "#2c3e50" }}>₱{product.price}</span>
          </div>
          <small style={{ color: "#7f8c8d" }}>Mfg: {product.manu_date} | Exp: {product.exp_date}</small>
          <div style={{ marginTop: "10px" }}>
            <button 
              onClick={() => onEdit(product)} 
              style={{ marginRight: "10px", padding: "4px 12px", cursor: "pointer" }}
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(product.product_id)} 
              style={{ color: "white", backgroundColor: "#dc3545", border: "none", borderRadius: "3px", padding: "4px 12px", cursor: "pointer" }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;