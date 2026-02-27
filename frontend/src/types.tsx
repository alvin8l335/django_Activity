export interface Category {
  category_id: number;
  category_name: string;
}

export interface Product {
  product_id: number;
  category: number; // Foreign Key to Category ID
  product_name: string;
  manu_date: string; // Dates are sent as strings (ISO format) in JSON
  exp_date: string;
  price: number;
}

export interface Customer {
  customer_id: number;
  name: string;
  address: string;
  contact: number;
  age: number;
}

export interface Order {
  order_id: number;
  customer: number; // Foreign Key to Customer ID
  quantity: number;
  order_date: string;
}

export interface OrderItem {
  order_item_id: number;
  order: number;
  product: number;
  customer: number;
  order_date: string;
}